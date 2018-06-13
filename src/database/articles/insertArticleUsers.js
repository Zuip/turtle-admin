let db = require('../connection');
let selectUser = require('../selectUser');

module.exports = {
  withArticleIdAndUserIds(articleId, userIds) {

    let insertUserPromises = userIds.map(userId => {
      return selectUser.withId(userId).then(user => {
        return db.none(
          `
            INSERT INTO article_user (
              article_id, user_id
            )
            VALUES ($1, $2)
          `,
          [ articleId, user.id ]
        );
      });
    });

    // Return resolved promise with null data when finished creating
    // the article users
    return Promise.all(insertUserPromises).then(
      resolvedInsertUserPromises => null
    );
  }
}
