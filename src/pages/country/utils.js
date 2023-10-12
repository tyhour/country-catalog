export function convertLangObjectToArrObject(data) {
  const translationArray = [];
  for (const languageCode in data) {
    if (data.hasOwnProperty(languageCode)) {
      const languageObject = data[languageCode];
      const commonName = languageObject.common;
      const officialName = languageObject.official;

      const translationItem = {
        languageCode: languageCode?.toUpperCase(),
        commonName,
        officialName,
      };

      translationArray.push(translationItem);
    }
  }
  return translationArray;
}
