import getDefaultField from '../getDefaultField';

export default function() {
  return Object.assign({}, {
    language: getLanguage(),
    name: getName(),
    urlName: getURLName()
  });
}

function getLanguage() {
  let language = getDefaultField();
  delete language.mandatory;
  return language;
}

function getName() {
  let name = getDefaultField();
  delete name.mandatory;
  return name;
}

function getURLName() {
  let urlName = getDefaultField();
  delete urlName.mandatory;
  return urlName;
}
