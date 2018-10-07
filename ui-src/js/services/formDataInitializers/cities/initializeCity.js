import getDefaultField from '../getDefaultField';
import initializeCityLanguageVersion from './initializeCityLanguageVersion';

export default function(translations) {
  return Object.assign({}, {
    languageVersions: [
      initializeCityLanguageVersion(translations)
    ],
    latitude: getLatitude(),
    longitude: getLongitude()
  });
};

function getLatitude() {
  let latitude = getDefaultField();
  return latitude;
}

function getLongitude() {
  let longitude = getDefaultField();
  return longitude;
}