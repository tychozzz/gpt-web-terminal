const RoleModel  = require("../model/role");
const UserModel = require("../model/user");
const RoleElement = require("../model/roleElement");
const MyError = require("../exception");
const { Op } = require("sequelize");

const {
  NO_AUTH_ERROR_CODE,
  ROLE_EXISTS_ERROR_CODE,
  SYSTEM_ERROR_CODE,
} = require("../exception/errorCode");

async function createRole(req, roleName, description, roleElementList) {
  const { userInfo } = req.session;
  if (!userInfo?.id) {
    throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
  }
  const currentUser = await UserModel.findByPk(userInfo.id);
  if (!currentUser) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "找不到该用户");
  }
  role = await RoleModel.findOne({where: {roleName: roleName, userId: currentUser.id}})
  console.log("角色信息", role)
  if (role) {
    throw new MyError(SYSTEM_ERROR_CODE, "角色已存在")
  }
  role = await RoleModel.create({
    userId: currentUser.id,
    roleName: roleName,
    description: description, 
  })
  roleElementList.forEach(async (r) => {
    await RoleElement.create({
      roleId: role.id,
      name: r.name,
      content: r.content
    })
  })
}

module.exports = {
  createRole
};
