import { defaultApi } from "../../lib/axios";
import { ICreateUrl, IUrl } from "../../model/url";

export const fetchById = async (id: string): Promise<IUrl> => {
  const { data: { data } } = await defaultApi.get(`/v1/url/${id}`);

  return data as IUrl;
};

export const create = async (payload: ICreateUrl): Promise<IUrl> => {
  const { data: { data } } = await defaultApi.post(`/v1/url`, payload);

  return data as IUrl;
};
