import fi from './fi.js';

let translations = {
  get: fi,
  setLanguage(language) {
    if(language === 'fi') {
      this.get = fi;
    }
  }
};

export default translations;
