const RoleModel = require("../model/role");
const UserModel = require("../model/user");
const RoleElement = require("../model/roleElement");
const MyError = require("../exception");
const { Op } = require("sequelize");

const {
  NO_AUTH_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  SYSTEM_ERROR_CODE,
} = require("../exception/errorCode");

async function auth(req) {
  const { userInfo } = req.session;
  if (!userInfo?.id) {
    throw new MyError(NO_AUTH_ERROR_CODE, "未登录");
  }
  const currentUser = await UserModel.findByPk(userInfo.id);
  if (!currentUser) {
    throw new MyError(NOT_FOUND_ERROR_CODE, "找不到该用户");
  }
  return currentUser;
}

async function createRole(req, keyword, name, description, roleElementList) {
  const currentUser = await auth(req);
  let role = await RoleModel.findOne({
    where: { keyword: keyword, userId: currentUser.id },
  });
  console.log("角色信息", role);
  if (role) {
    throw new MyError(SYSTEM_ERROR_CODE, "角色已存在");
  }
  role = await RoleModel.create({
    userId: currentUser.id,
    keyword: keyword,
    name: name,
    description: description,
  });
  roleElementList.forEach(async (r) => {
    await RoleElement.create({
      roleId: role.id,
      name: r.name,
      content: r.content,
    });
  });
}

async function listRoleByUserId(req) {
  let currentUser = await auth(req);
  let roleList = await RoleModel.findAll({ where: { userId: currentUser.id } });
  return roleList;
}

async function getRoleElementsByKeyword(req, keyword) {
  let currentUser = await auth(req);
  let role = await RoleModel.findOne({
    where: { userId: currentUser.id, keyword: keyword },
  });
  if (!role) {
    throw new MyError(SYSTEM_ERROR_CODE, "角色不存在");
  }
  let roleElements = await RoleElement.findAll({ where: { roleId: role.id } });
  return roleElements.map((r) => {
    return {
      role: r.name,
      content: r.content,
    };
  });
}

module.exports = {
  createRole,
  listRoleByUserId,
  getRoleElementsByKeyword,
};
