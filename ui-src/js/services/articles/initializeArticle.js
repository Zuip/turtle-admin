import translations from '../../translations/translations';

export default function() {
  return Object.assign({}, {
    topic: getTopic(),
    urlName: getURLName(),
    city: getCity(),
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

function getTopic() {
  let topic = getDefaultField();
  topic.mandatory = true;
  return topic;
}

function getURLName() {
  let urlName = getDefaultField();
  urlName.mandatory = true;
  return urlName;
}

function getCity() {
  let city = getDefaultField();
  city.value = null;
  city.options = [];
  return city;
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
