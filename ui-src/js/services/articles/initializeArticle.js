import translations from '../../translations/translations';

export default function(languages) {
  return Object.assign({}, {
    summary: getDefaultField(),
    text: getText(),
    language: getLanguages(languages)
  });
};

function getDefaultField() {
  return Object.assign({}, {
    value: '',
    failed: false,
    mandatory: false
  });
}

function getText() {
  let text = getDefaultField();
  text.mandatory = true;
  return text;
}

function getLanguages(languages) {

  if(typeof languages === 'undefined') {
    return undefined;
  }
  
  let languagesSelect = getDefaultField();
  languagesSelect.mandatory = true;
  languagesSelect.options = languages.map(language => ({
    translation: language,
    value: language
  }));
  languagesSelect.value = languagesSelect.options[0].value;

  return languagesSelect;
}
