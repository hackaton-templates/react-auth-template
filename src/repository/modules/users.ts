import { SignUpDto } from "@/lib/dto/sign-up.dto";
import { HttpModule } from "..";
import { User } from "@/types/user.type";

export default class UsersModule extends HttpModule {
  async create(signUpDto: SignUpDto) {
    return await this.call<User>("POST", "/users", JSON.stringify(signUpDto));
  }
}
