import translations from '../translations/translations'

let store = {
  state: {
    user: null,
    translations: translations.get
  },
  getters: {
    getUser: function(state) {
      return state.user;
    },
    userIsLoggedIn: function(state) {
      return state.user !== null;
    },
    getTranslations: function(state) {
      return state.translations;
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    logout(context) {
      context.commit('logout');
    }
  }
};

export default store;
