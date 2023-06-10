import myAxios from "../../../plugins/myAxios";

export const userLogin = async (username: string, password: string) => {
  if (!username || !password) {
    return null;
  }
  return await myAxios.post("/user/login", { username, password });
};

export const userLogout = async () => {
  return await myAxios.post("/user/logout");
};

export const userRegister = async (
  username: string,
  password: string,
  email: string
) => {
  if (!username || !password || !email) {
    return null;
  }
  return await myAxios.post("/user/register", { username, password, email });
};

export const getLoginUser = async () => {
  return await myAxios.post("/user/current");
};
