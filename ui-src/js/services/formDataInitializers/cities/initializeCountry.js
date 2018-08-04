import initializeCountryLanguageVersion from './initializeCountryLanguageVersion';

export default function() {
  return Object.assign({}, {
    languageVersions: [
      initializeCountryLanguageVersion()
    ]
  });
};
