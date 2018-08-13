import initializeCityLanguageVersion from './initializeCityLanguageVersion';

export default function(translations) {
  return Object.assign({}, {
    languageVersions: [
      initializeCityLanguageVersion(translations)
    ]
  });
};
