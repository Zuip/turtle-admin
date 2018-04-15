import translations from '../translations/translations'

let store = {
  state: {
    user: null,
    translations: translations.get,
    loading: [],
    popup: null
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
    },
    popupIsBeingShown: function(state) {
      return state.popup !== null;
    },
    getPopupContent: function(state) {
      return state.popup;
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
    },
    openPopup(state, component) {
      state.popup = component;
    },
    closePopup(state) {
      state.popup = null;
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
    },
    openPopup(context, component) {
      context.commit('openPopup', component);
    },
    closePopup(context) {
      context.commit('closePopup');
    }
  }
};

export default store;
