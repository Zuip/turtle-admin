import initializeCountryLanguageVersion from './initializeCountryLanguageVersion';

export default function(translations) {
  return Object.assign({}, {
    languageVersions: [
      initializeCountryLanguageVersion(translations)
    ]
  });
};
