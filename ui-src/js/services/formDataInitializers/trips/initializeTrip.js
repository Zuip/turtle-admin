import getDefaultField from '../getDefaultField';
import initializeTripLanguageVersion from './initializeTripLanguageVersion';

export default function(translations) {
  return Object.assign({}, {
    languageVersions: [
      initializeTripLanguageVersion(translations)
    ],
    users: getUsers()
  });
};

function getUsers() {
  let users = getDefaultField();
  users.value = [];
  users.mandatory = true;
  users.users = [];
  return users;
}
