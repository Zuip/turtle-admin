let getUserPermission = require('../../integrations/permissions/getUserPermission');

module.exports = function(userId) {
  return {
    isAllowedTo(action) {
      return {
        target(targetName) {
          return getUserPermission.withUserIdAndTargetAndAction(
            userId,
            targetName,
            action
          ).then(
            () => undefined
          ).catch(
            () => Promise.reject()
          );
        }
      };
    }
  };
};