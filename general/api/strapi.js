const qs = require("qs");
import axios from "axios";

export function getStrapiSingleType (singleTypeName, populateParams) {
const query = qs.stringify(
  {
    populate: populateParams,
  },
  {
    encodeValuesOnly: true,
  }
);
return axios.get(`${process.env.strapiBaseUri}/api/${singleTypeName}?${query}`);
}

export function getStrapiElementFromCollection(
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
  return axios.get(
    `${process.env.strapiBaseUri}/api/${collectionName}?${query}`
  );
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
  return axios.get(
    `${process.env.strapiBaseUri}/api/${collectionName}?${query}`
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
    return {
      error: error,
    };
  }

  return data;
}

