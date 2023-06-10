import myAxios from "../../../plugins/myAxios";

/**
 * gpt请求
 * @param keywords
 * @param config
 */
export const getGptOutput = async (message: string, role: string) => {
  console.log(message);
  if (!message) {
    return null;
  }
  return await myAxios.post("/gpt/get", { message, role });
};
