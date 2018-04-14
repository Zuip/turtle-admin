import translations from '../translations/translations'

let store = {
  state: {
    user: null,
    translations: translations.get,
    loading: []
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
      return state.loading.length > 0;
    }
  },
  mutations: {
    login(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    },
    startContentLoading(state, contentId) {
      state.loading.push(contentId);
    },
    endContentLoading(state, contentId) {
      state.loading = state.loading.filter(function(contentBeingLoaded) {
        return contentId !== contentBeingLoaded;
      });
    }
  },
  actions: {
    login(context, user) {
      context.commit('login', user);
    },
    logout(context) {
      context.commit('logout');
    },
    startContentLoading(context, contentId) {
      context.commit('startContentLoading', contentId);
    },
    endContentLoading(context, contentId) {
      context.commit('endContentLoading', contentId);
    }
  }
};

export default store;
