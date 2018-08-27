module.exports = {
  getSelectQuery: function() {
    return `
      article.id AS article_id,
      translated_article.summary AS article_summary,
      translated_article.text AS article_text,
      article.created AS article_created,
      translated_article.published AS article_is_published,
      translated_article.language AS article_language
    `;
  }
};
