import myAxios from "../../../../../plugins/myAxios";

interface RoleElement {
  name: string;
  content: string;
}

export const createRole = async (
  roleName: string,
  description: string,
  roleElementList: RoleElement[]
) => {
  return await myAxios.post("/role/create", {
    roleName,
    description,
    roleElementList,
  });
};
