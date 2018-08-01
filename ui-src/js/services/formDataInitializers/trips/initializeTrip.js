import getDefaultField from '../getDefaultField';
import initializeTripLanguageVersion from './initializeTripLanguageVersion';

export default function() {
  return Object.assign({}, {
    languageVersions: [
      initializeTripLanguageVersion()
    ],
    users: getUsers()
  });
};

function getUsers() {
  let users = getDefaultField();
  users.mandatory = true;
  users.value = [];
  return users;
}

function getUsers() {
  let users = getDefaultField();
  users.value = [];
  users.mandatory = true;
  users.users = [];
  return users;
}
