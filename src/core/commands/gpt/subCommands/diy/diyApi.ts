import myAxios from "../../../../../plugins/myAxios";

interface RoleElement {
  name: string;
  content: string;
}

export const createRole = async (
  keyword: string,
  name: string,
  description: string,
  roleElementList: RoleElement[]
) => {
  return await myAxios.post("/role/create", {
    keyword,
    name,
    description,
    roleElementList,
  });
};

export const hasRole = async (keyword: string) => {
  return await myAxios.post("/role/getRoleElementsByKeyword", {
    keyword,
  });
};
