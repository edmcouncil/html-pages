import { prepareDescription } from "./meta";

export function generateTitleAndDescription(body) {
  let title = null;
  let description = null;
  if (body.result.properties["Glossary"]) {
    //check is title or label exist and set it to title page
    if (
      body.result.properties["Glossary"].title &&
      body.result.properties["Glossary"].title[0]
    ) {
      title = body.result.properties["Glossary"].title[0].value;
    } else if (
      body.result.properties["Glossary"].label &&
      body.result.properties["Glossary"].label[0]
    ) {
      title = body.result.properties["Glossary"].label[0].value;
    }
    //check is abstract or definition exist and set it to description
    if (
      body.result.properties["Glossary"].abstract &&
      body.result.properties["Glossary"].abstract[0]
    ) {
      description = prepareDescription(
        body.result.properties["Glossary"].abstract[0].value
      );
    } else if (
      body.result.properties["Glossary"].definition &&
      body.result.properties["Glossary"].definition[0]
    ) {
      description = prepareDescription(
        body.result.properties["Glossary"].definition[0].value
      );
    }
  }

  return { title, description }
}

export function handleDeprecatedResource(body) {
  if (
    body.result.properties["Ontological characteristic"] &&
    body.result.properties["Ontological characteristic"].deprecated &&
    body.result.properties["Ontological characteristic"].deprecated[0]
      .value === "true"
  ) {
    body.result.deprecated = true;
    delete body.result.properties["Ontological characteristic"]
      .deprecated;
    if (
      Object.keys(body.result.properties["Ontological characteristic"])
        .length === 0
    ) {
      delete body.result.properties["Ontological characteristic"];
    }
  } else {
    body.result.deprecated = false;
  }
}
