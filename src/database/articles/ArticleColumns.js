module.exports = {
  getSelectQuery: function() {
    return `
      article.id AS id,
      translated_article.summary AS summary,
      translated_article.text AS text,
      article.timestamp AS timestamp,
      translated_article.published AS published,
      translated_article.language_id AS language_id
    `;
  }
};
