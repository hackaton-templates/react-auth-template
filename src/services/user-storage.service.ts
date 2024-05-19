import { User } from "@/types/user.type";
import { CookieOpts, CookieService } from "./cookie.service";

class UserStorageService extends CookieService {
  constructor() {
    super("user");
  }

  get(cookies?: CookieOpts) {
    return super.get(cookies) as User | null;
  }

  set(data: User, cookies?: CookieOpts): void {
    return super.set(data, cookies);
  }
}

const userStorageService = new UserStorageService();
export default userStorageService;
