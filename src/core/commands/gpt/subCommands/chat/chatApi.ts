import myAxios from "../../../../../plugins/myAxios";

export const getRoleElementsByKeyword = async (keyword: string) => {
  return myAxios.post("/role/getRoleElementsByKeyword", {
    keyword,
  });
};
