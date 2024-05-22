import { User } from "@/types/user.type";
import { CookieOpts, CookieService } from "./cookie.service";

class UserStorageService extends CookieService {
  constructor() {
    super("user");
  }

  async get(cookies?: CookieOpts) {
    return (await super.get(cookies)) as User | null;
  }

  async set(data: User, cookies?: CookieOpts) {
    return await super.set(data, cookies);
  }
}

const userStorageService = new UserStorageService();
export default userStorageService;
