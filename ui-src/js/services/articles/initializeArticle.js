import translations from '../../translations/translations';

export default function() {
  return Object.assign({}, {
    summary: getDefaultField(),
    text: getText(),
    publish: getPublish(),
    published: getPublished(),
    writers: getWriters()
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

function getPublish() {
  let publish = getDefaultField();
  publish.value = { date: '', time: '' };
  publish.mandatory = true;
  return publish;
}

function getPublished() {

  let published = getDefaultField();
  published.value = 'no';
  published.mandatory = true;
  published.options = [
    Object.assign({}, { value: 'no', translation: translations.get.no }),
    Object.assign({}, { value: 'yes', translation: translations.get.yes })
  ];

  return published;
}

function getWriters() {
  let writers = getDefaultField();
  writers.value = [];
  writers.mandatory = true;
  writers.users = [];
  return writers;
}
