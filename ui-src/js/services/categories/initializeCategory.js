import translations from '../../translations/translations';

function getDefaultField() {
  return Object.assign({}, { value: '', failed: false, mandatory: false });
}

export default function() {

  let categoryName = getDefaultField();
  categoryName.mandatory = true;

  let urlName = getDefaultField();
  urlName.mandatory = true;

  let description = getDefaultField();

  let published = getDefaultField();
  published.value = 'no';
  published.mandatory = true;
  published.options = [
    Object.assign({}, { value: 'no', translation: translations.get.no }),
    Object.assign({}, { value: 'yes', translation: translations.get.yes })
  ];

  return Object.assign({}, {
    categoryName, urlName, description, published
  });
};
