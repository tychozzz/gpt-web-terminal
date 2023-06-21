import myAxios from "../../../../../plugins/myAxios";

export const getImage = async (
  prompt: string,
  number: number,
  size: string
) => {
  return await myAxios.post("/gpt/getImage", {
    prompt,
    number,
    size,
  });
};
