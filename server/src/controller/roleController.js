const { createRole } = require("../service/roleService");
/**
 * 创建角色
 * @param event
 * @param req
 * @param res
 */
async function roleCreateApi(event, req, res) {
  const { roleName, description, roleElementList } = event;
  console.log("roleName", roleName);
  console.log("description", description);
  console.log("roleElementList", roleElementList);
  return await createRole(req, roleName, description, roleElementList);
}

module.exports = {
  roleCreateApi,
};
