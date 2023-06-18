const {
  createRole,
  listRoleByUserId,
  getRoleElementsByKeyword,
} = require("../service/roleService");

/**
 * 创建角色
 * @param event
 * @param req
 * @param res
 */
async function roleCreateApi(event, req, res) {
  const { keyword, name, description, roleElementList } = event;
  console.log("keyword", keyword);
  console.log("name", name);
  console.log("description", description);
  console.log("roleElementList", roleElementList);
  return await createRole(req, keyword, name, description, roleElementList);
}

/**
 * 根据用户 ID 获取全部角色
 * @param event
 * @param req
 * @param res
 * @returns
 */
async function roleListByUserIdApi(event, req, res) {
  return await listRoleByUserId(req);
}

/**
 * 获取角色具体信息
 * @param
 * @param
 * @param
 * @returns
 */
async function getRoleElementsByKeywordApi(event, req, res) {
  const { keyword } = event;
  return await getRoleElementsByKeyword(req, keyword);
}

module.exports = {
  roleCreateApi,
  roleListByUserIdApi,
  getRoleElementsByKeywordApi,
};
