import myAxios from "../../../../../plugins/myAxios";

export const listRoleByUserId = async () => {
  return await myAxios.post("/role/listByUserId")
}