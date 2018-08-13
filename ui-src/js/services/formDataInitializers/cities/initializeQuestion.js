import initializeQuestionLanguageVersion from './initializeQuestionLanguageVersion';

export default function(translations) {
  return Object.assign({}, {
    languageVersions: [
      initializeQuestionLanguageVersion(translations)
    ]
  });
};
