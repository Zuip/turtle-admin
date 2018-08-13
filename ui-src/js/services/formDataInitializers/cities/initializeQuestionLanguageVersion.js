import getDefaultField from '../getDefaultField';

export default function(translations) {
  return Object.assign({}, {
    language: getLanguage(),
    text: getText(translations)
  });
}

function getLanguage() {
  let language = getDefaultField();
  delete language.mandatory;
  return language;
}

function getText(translations) {
  let text = getDefaultField();
  text.name = translations.cities.questions.question;
  delete text.mandatory;
  return text;
}
