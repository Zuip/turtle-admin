import getDefaultField from '../getDefaultField';

export default function() {
  return Object.assign({}, {
    city: getCity(),
    start: getStart(),
    end: getEnd()
  });
};

function getCity() {
  let city = getDefaultField();
  city.value = null;
  city.options = [];
  city.mandatory = true;
  return city;
}

function getStart() {
  let start = getDefaultField();
  return start;
}

function getEnd() {
  let end = getDefaultField();
  return end;
}