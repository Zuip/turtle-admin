import translations from '../translations/translations'

let store = {
  state: {
    user: null,
    translations: translations.get,
    loading: false
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
    },
    contentIsBeingLoaded: function(state) {
      return state.loading;
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    startContentLoading(state) {
      state.loading = true;
    },
    endContentLoading(state) {
      state.loading = false;
    }
  },
  actions: {
    login(context) {
      context.commit('login');
    },
    logout(context) {
      context.commit('logout');
    },
    startContentLoading(context) {
      content.commit('startContentLoading');
    },
    endContentLoading(context) {
      content.commit('endContentLoading');
    }
  }
};

export default store;
