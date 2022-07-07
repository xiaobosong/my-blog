import { userInfo } from "./../../types/user.type";
import { Request } from "../../utils/http";
import { CommonResponse, HTTPMethod, ListData } from "../../types/common.type";
const HTTP = new Request("/api/user/");
export const UserApi = {
  createUser(data: userInfo): Promise<null | CommonResponse<any>> {
    return HTTP.sendReq("create", HTTPMethod.POST, { ...data });
  },
  findOneUser(name: string): Promise<any> {
    return HTTP.sendReq("findOne", HTTPMethod.GET, { name });
  },
};
