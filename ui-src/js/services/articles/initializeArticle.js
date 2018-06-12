import translations from '../../translations/translations';

function getDefaultField() {
  return Object.assign({}, { value: '', failed: false, mandatory: false });
}

export default function() {

  let topic = getDefaultField();
  topic.mandatory = true;

  let urlName = getDefaultField();
  urlName.mandatory = true;

  let summary = getDefaultField();

  let text = getDefaultField();
  text.mandatory = true;

  let publish = getDefaultField();
  publish.value = { date: '', time: '' };
  publish.mandatory = true;

  let published = getDefaultField();
  published.value = 'no';
  published.mandatory = true;
  published.options = [
    Object.assign({}, { value: 'no', translation: translations.get.no }),
    Object.assign({}, { value: 'yes', translation: translations.get.yes })
  ];

  let writers = getDefaultField();
  writers.value = [];
  writers.mandatory = true;
  writers.users = [];

  return Object.assign({}, {
    topic, urlName, summary, text, publish, published, writers
  });
};
