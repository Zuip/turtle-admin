import getDefaultField from '../getDefaultField';

export default function() {
  return Object.assign({}, {
    name: getName(),
    urlName: getURLName()
  });
};

function getName() {
  let topic = getDefaultField();
  topic.mandatory = true;
  return topic;
}

function getURLName() {
  let urlName = getDefaultField();
  urlName.mandatory = true;
  return urlName;
}
