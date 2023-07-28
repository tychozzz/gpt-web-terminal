import type { AxiosProgressEvent, GenericAbortSignal } from "axios";
import { post } from "../../../../../utils/request";
import myAxios from "../../../../../plugins/myAxios";

export const getRoleElementsByKeyword = async (keyword: string) => {
  return myAxios.post("/role/getRoleElementsByKeyword", {
    keyword,
  });
};

export function fetchChatAPIProcess<T = any>(params: {
  prompt: string;
  options?: { conversationId?: string; parentMessageId?: string };
  signal?: GenericAbortSignal;
  systemMessage?: string;
  temperature?: number;
  onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void;
}) {
  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
    systemMessage: params.systemMessage,
    temperature: params.temperature
  };
  return post<T>({
    url: "/chat-process",
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  });
}
