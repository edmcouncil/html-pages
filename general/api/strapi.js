import axios from 'axios';
import qs from 'qs';
import fs from 'fs';

function baseURL(runtimeConfig) {
 return (typeof window !== 'undefined') ? window.location.origin + `${runtimeConfig.public.strapiBasePath}` : `${runtimeConfig.public.strapiBaseUrl}`;
}

export async function getStrapiSingleType(singleTypeName, populateParams, runtimeConfig) {
  const query = qs.stringify(
    {
      populate: populateParams,
    },
    {
      encodeValuesOnly: true,
    },
  );

  let response = await axios.get(`/api/${singleTypeName}?${query}`, {
    baseURL: baseURL(runtimeConfig),
  });

  // save image and edit response to use downloaded image instead of link to strapi resources
  if (runtimeConfig.public.staticGenerationMode) {
    response = await downloadImagesFromStrapi(response, singleTypeName, runtimeConfig);
  }

  return response.data;
}

export async function getStrapiElementFromCollection(
  collectionName,
  populateParams,
  collectionItemSlug,
) {
  const runtimeConfig = useRuntimeConfig();

  const queryParams = { populate: populateParams };
  if (collectionItemSlug) {
    queryParams.filters = { slug: { $eq: collectionItemSlug } };
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  let response = await axios.get(`/api/${collectionName}?${query}`, {
    baseURL: baseURL(runtimeConfig),
  });

  // save image and edit response to use downloaded image instead of link to strapi resources
  if (runtimeConfig.public.staticGenerationMode) {
    response = await downloadImagesFromStrapi(response, collectionName, runtimeConfig);
  }
  return response.data;
}

export async function getStrapiCollection(
  collectionName,
  populateParams,
  sortParams,
  runtimeConfig
) {
  const queryParams = { populate: populateParams };
  if (sortParams) {
    queryParams.sort = sortParams;
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  const response = await axios.get(`/api/${collectionName}?${query}`, {
    baseURL: baseURL(runtimeConfig),
  });
  // currently only release notes is processed in this function, so we don't need to download images, they don't have them
  return response.data;
}

export async function getPageElementsStrapiData(runtimeConfig) {
  const data = {};
  // footer
  let singleTypeName = 'footer';
  let populateParams = ['contacts', 'links', 'socials'];

  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams, runtimeConfig);
    data.copyright = response.data.attributes.copyright;
    data.footerContacts = response.data.attributes.contacts;
    data.footerLinks = response.data.attributes.links;
    data.footerSocials = response.data.attributes.socials;
    data.useCustomFooterData = response.data.attributes.useCustomFooterData;
  } catch (error) {
    return {};
  }

  // carousel
  singleTypeName = 'carousel';
  populateParams = ['items', 'items.link'];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams, runtimeConfig);
    data.carousel = response.data.attributes.items;
  } catch (error) {
    return {};
  }

  // menu-dropdown
  singleTypeName = 'menu-single';
  populateParams = ['items', 'items.item', 'items.submenu'];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams, runtimeConfig);
    data.menuDropdown = response.data.attributes.items;
  } catch (error) {
    return {};
  }

  // menu-top
  singleTypeName = 'menu-top';
  populateParams = ['items', 'items.item', 'items.submenu'];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams, runtimeConfig);
    data.menuTop = response.data.attributes.items;
  } catch (error) {
    data.menuTop = [];
  }

  return data;
}

export async function getAppConfigurationData(runtimeConfig) {
  let data = {};

  // config
  const singleTypeName = 'config';
  const populateParams = ['ontologyLogo'];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams, runtimeConfig);

    data.ontpubFamily = response.data.attributes.ontpubFamily;
    data.ontoviewerServerUrl = response.data.attributes.ontoviewerServerUrl;
    data.uriSpace = response.data.attributes.uriSpace;
    data.ontologyRepositoryUrl = response.data.attributes.ontologyRepositoryUrl;
    data.jenkinsJobUrl = response.data.attributes.jenkinsJobUrl;

    // overwrite with 'variables' data
    const { variables } = response.data.attributes;

    if (variables) {
      data = {
        ...data,
        ...variables,
      };
    }

    // download logo
    const imgPath = response.data.attributes.ontologyLogo?.data?.attributes?.url;

    const imageDownloadPath = '/_nuxt/downloads/';
    const distDir = runtimeConfig.public.generateDir;
    const imageDestination = distDir + imageDownloadPath;

    if (imgPath && runtimeConfig.public.staticGenerationMode) {
      const imageName = imgPath.split('/').pop();
      const imageUrl = baseURL(runtimeConfig) + imgPath;
      downloadImage(imageUrl, imageDestination, imageName);
      data.ontologyLogoUrl = `/${runtimeConfig.public.ontologyName}${runtimeConfig.public.assetsDir}downloads/${imageName}`;
    } else {
      data.ontologyLogoUrl = null;
    }
  } catch (error) {
    return {};
  }

  return data;
}
async function downloadImage(url, imageDestination, imageName) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });
  if (!fs.existsSync(imageDestination)) {
    fs.mkdirSync(imageDestination, { recursive: true });
  }
  const filepath = imageDestination + imageName;
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on('error', reject)
      .once('close', () => resolve(filepath));
  });
}

async function downloadImagesFromStrapi(response, elementTypeName, runtimeConfig) {
  // only 'about' can have images in content from single types element
  if (elementTypeName === 'about' || elementTypeName === 'pages') {
    const imageDownloadPath = '/_nuxt/downloads/';
    const distDir = runtimeConfig.public.generateDir;
    const imageDestination = distDir + imageDownloadPath;
    if (response.data.data && response.data.data.attributes) {
      for (var section of response.data.data.attributes.sections) {
        section = await tryToDownloadImages(
          section,
          imageDestination,
          runtimeConfig
        );
      }
    } else if (response.data.data[0]) {
      for (const dataElement of response.data.data) {
        for (var section of dataElement.attributes.sections) {
          section = await tryToDownloadImages(
            section,
            imageDestination,
            runtimeConfig
          );
        }
      }
    }
  }
  return response;
}

async function tryToDownloadImages(
  section,
  imageDestination,
  runtimeConfig
) {
  if (section.__component == 'sections.image-text-section' && section.items) {
    for (const item of section.items) {
      if (item.image) {
        const imageResponseUrl = item?.image?.data?.attributes?.url;
        if (imageResponseUrl != undefined) {
          const imageName = imageResponseUrl.split('/').pop();
          const imageUrl = baseURL(runtimeConfig) + imageResponseUrl;
          downloadImage(imageUrl, imageDestination, imageName);
          item.image.data.attributes.url = `/${runtimeConfig.public.ontologyName}${runtimeConfig.public.assetsDir}downloads/${imageName}`;
        }
      }
    }
  }
  return section;
}
