const qs = require("qs");
import axios from "axios";

export function getStrapiData (collectionName, populateParams) {
const query = qs.stringify(
  {
    populate: populateParams,
  },
  {
    encodeValuesOnly: true,
  }
);
return axios.get(`${process.env.strapiBaseUri}/api/${collectionName}?${query}`);
}

export async function getPageElementsStrapiData() {
  var data = {};
  //footer
  var collectionName = "footer";
  var populateParams = [];

  try {
    const response = await getStrapiData(collectionName, populateParams);
    data.copyright = response.data.data.attributes.copyright;
  } catch (error) {
    return {
      error: error,
    };
  }

  //carousel
  collectionName = "carousel";
  populateParams = ["items", "items.link"];
  try {
    const response = await getStrapiData(collectionName, populateParams);
    data.carousel = response.data.data.attributes.items;
  } catch (error) {
    return {
      error: error,
    };
  }

  //menu-dropdown
  collectionName = "menu-single";
  populateParams = ["items", "items.item", "items.submenu"];
  try {
    const response = await getStrapiData(collectionName, populateParams);
    data.menuDropdown = response.data.data.attributes.items;
  } catch (error) {
    return {
      error: error,
    };
  }

  //menu-top
  collectionName = "menu-top";
  populateParams = ["items", "items.item", "items.submenu"];
  try {
    const response = await getStrapiData(collectionName, populateParams);
    data.menuTop = response.data.data.attributes.items;
  } catch (error) {
    return {
      error: error,
    };
  }

  return data;
}

