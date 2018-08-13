import getDefaultField from '../getDefaultField';

export default function(translations) {
  return Object.assign({}, {
    language: getLanguage(),
    name: getName(translations),
    urlName: getURLName(translations)
  });
}

function getLanguage() {
  let language = getDefaultField();
  delete language.mandatory;
  return language;
}

function getName(translations) {
  let name = getDefaultField();
  name.name = translations.common.name;
  delete name.mandatory;
  return name;
}

function getURLName(translations) {
  let urlName = getDefaultField();
  urlName.name = translations.common.urlName;
  delete urlName.mandatory;
  return urlName;
}
