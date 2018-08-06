import getDefaultField from '../getDefaultField';

export default function() {
  return Object.assign({}, {
    city: getCity(),
    start: getStart(),
    end: getEnd(),
    users: getUsers()
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

  let start = Object.assign({}, {
    year: getDefaultField(),
    month: getDefaultField(),
    day: getDefaultField()
  });

  return start;
}

function getEnd() {
  
  let end = Object.assign({}, {
    year: getDefaultField(),
    month: getDefaultField(),
    day: getDefaultField()
  });

  return end;
}

function getUsers() {
  let users = getDefaultField();
  users.mandatory = true;
  users.value = [];
  users.users = [];
  return users;
}