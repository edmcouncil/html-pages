const qs = require("qs");
const fs = require("fs");
import axios from "axios";

export async function getStrapiSingleType(singleTypeName, populateParams) {
  const query = qs.stringify(
    {
      populate: populateParams,
    },
    {
      encodeValuesOnly: true,
    }
  );

  let response = await axios.get(
    `${process.env.strapiBaseUrl}/api/${singleTypeName}?${query}`
  );

  // save image and edit response to use downloaded image instead of link to strapi resources
  if (process.env.staticGenerationMode) {
    response = await downloadImagesFromStrapi(response, singleTypeName);
  }

  // return axios.get(`/api/${singleTypeName}?${query}`,{baseURL: (typeof window !== 'undefined') ? window.location.origin + `/${process.env.ontologyName}` : `${process.env.strapiBaseUrl}`});
  return response;
}

export async function getStrapiElementFromCollection(
  collectionName,
  populateParams,
  collectionItemSlug
) {
  var queryParams = { populate: populateParams };
  if (collectionItemSlug) {
    queryParams.filters = { slug: { $eq: collectionItemSlug } };
  }
  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  let response = await axios.get(
    `${process.env.strapiBaseUrl}/api/${collectionName}?${query}`
  );

  // save image and edit response to use downloaded image instead of link to strapi resources
  if (process.env.staticGenerationMode) {
    response = await downloadImagesFromStrapi(response, collectionName);
  }
  return response;
}
export function getStrapiCollection(
  collectionName,
  populateParams,
  sortParams,
) {
  var queryParams = { populate: populateParams };
  if (sortParams) {
    queryParams.sort = sortParams;
  }
  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });
  // currently only release notes is processed in this function, so we don't need to download images, they don't have them
  return axios.get(
    `${process.env.strapiBaseUrl}/api/${collectionName}?${query}`
  );
}

export async function getPageElementsStrapiData() {
  var data = {};
  //footer
  var singleTypeName = "footer";
  var populateParams = [];

  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams);
    data.copyright = response.data.data.attributes.copyright;
  } catch (error) {
    return {
      error: error,
    };
  }

  //carousel
  singleTypeName = "carousel";
  populateParams = ["items", "items.link"];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams);
    data.carousel = response.data.data.attributes.items;
  } catch (error) {
    return {
      error: error,
    };
  }

  //menu-dropdown
  singleTypeName = "menu-single";
  populateParams = ["items", "items.item", "items.submenu"];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams);
    data.menuDropdown = response.data.data.attributes.items;
  } catch (error) {
    return {
      error: error,
    };
  }

  //menu-top
  singleTypeName = "menu-top";
  populateParams = ["items", "items.item", "items.submenu"];
  try {
    const response = await getStrapiSingleType(singleTypeName, populateParams);
    data.menuTop = response.data.data.attributes.items;
  } catch (error) {
    data.menuTop = [];
  }

  return data;
}

async function downloadImage(url, imageDestination, imageName) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  if (!fs.existsSync(imageDestination)) {
    fs.mkdirSync(imageDestination, { recursive: true });
  }
  const filepath = imageDestination + imageName;
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath))
      .on("error", reject)
      .once("close", () => resolve(filepath));
  });
}

async function downloadImagesFromStrapi(response, elementTypeName) {
  // only 'about' can have images in content from single types element
  if (elementTypeName === "about" || elementTypeName === "pages") {
    const imageDownloadPath =
      process.env.assetsDir +
      (process.env.assetsDir.endsWith("/") ? "" : "/") +
      "downloads/";
    const distDir = process.env.generateDir + process.env.distDir;
    const imageDestination =
      (distDir.endsWith("/") && !imageDownloadPath.startsWith("/")) ||
      (!distDir.endsWith("/") && imageDownloadPath.startsWith("/"))
        ? distDir + imageDownloadPath
        : distDir.endsWith("/") && imageDownloadPath.startsWith("/")
        ? distDir + imageDownloadPath.substring(1)
        : distDir + "/" + imageDownloadPath;
    if (response.data.data && response.data.data.attributes) {
      for (var section of response.data.data.attributes.sections) {
        section = await tryToDownloadImages(
          section,
          imageDestination,
          imageDownloadPath
        );
      }
    } else if (response.data.data[0]) {
      for (var dataElement of response.data.data) {
        for (var section of dataElement.attributes.sections) {
          section = await tryToDownloadImages(
            section,
            imageDestination,
            imageDownloadPath
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
  imageDownloadPath
) {
  if (section.__component == "sections.image-text-section" && section.items) {
    for (const item of section.items) {
      if (item.image) {
        const imageResponseUrl = item?.image?.data?.attributes?.url;
        if (imageResponseUrl != undefined) {
          let imageName = imageResponseUrl.split("/").pop();
          const imageUrl = process.env.strapiBaseUrl + imageResponseUrl;
          downloadImage(imageUrl, imageDestination, imageName);
          item.image.data.attributes.url = `/${process.env.ontologyName}${imageDownloadPath}${imageName}`;
        }
      }
    }
  }
  return section;
}
