import { Request } from "../../utils/http";
import { CommonResponse, HTTPMethod, ListData } from "../../types/common.type";
import { ArticleItem, SearchParams } from "../../types/article.type";
const HTTP = new Request("/api/article/");
export const ArticleApi = {
  createArticle(data: ArticleItem): Promise<null | CommonResponse<any>> {
    return HTTP.sendReq("create", HTTPMethod.POST, { ...data });
  },
  getList(data?: SearchParams): Promise<null | CommonResponse<any>> {
    return HTTP.sendReq("list", HTTPMethod.GET, { ...data });
  },
  deleteItem(id: number): Promise<null | CommonResponse<any>> {
    return HTTP.sendReq("remove", HTTPMethod.POST, { id });
  },

  editItem(data: ArticleItem): Promise<null | CommonResponse<any>> {
    return HTTP.sendReq("edit", HTTPMethod.POST, { ...data });
  },
};
