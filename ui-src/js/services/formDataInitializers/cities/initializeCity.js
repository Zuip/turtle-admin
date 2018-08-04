import initializeCityLanguageVersion from './initializeCityLanguageVersion';

export default function() {
  return Object.assign({}, {
    languageVersions: [
      initializeCityLanguageVersion()
    ]
  });
};
