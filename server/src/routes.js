/**
 * 接口路由
 * @author yupi
 */
const routes = [
  {
    path: "/user/register",
    handler: require("./controller/userController").userRegisterApi,
  },
  {
    path: "/user/login",
    handler: require("./controller/userController").userLoginApi,
  },
  {
    path: "/user/logout",
    handler: require("./controller/userController").userLogoutApi,
  },
  {
    path: "/user/current",
    handler: require("./controller/userController").getLoginUserApi,
  },
  {
    path: "/gpt/get",
    handler: require("./controller/gptController").getGptOutput,
  },
  {
    path: "/gpt/getImage",
    handler: require("./controller/gptController").getGptImage,
  },
  {
    path: "/role/create",
    handler: require("./controller/roleController").roleCreateApi,
  },
  {
    path: "/role/listByUserId",
    handler: require("./controller/roleController").roleListByUserIdApi,
  },
  {
    path: "/role/getRoleElementsByKeyword",
    handler: require("./controller/roleController").getRoleElementsByKeywordApi,
  },
];

module.exports = routes;
