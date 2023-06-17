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
    path: "/role/create",
    handler: require("./controller/roleController").roleCreateApi,
  },
];

module.exports = routes;
