import translations from '../translations/translations'

let store = {
  state: {
    translations: translations.get
  },
  getters: {
    getTranslations: function(state) {
      return state.translations;
    }
  }
};

export default store;
