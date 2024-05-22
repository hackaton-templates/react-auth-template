import { api } from "@/lib/axios";
import UsersModule from "@/repository/modules/users";

export type Repository = {
  users: UsersModule;
};

export default function useRepository() {
  const modules: Repository = {
    users: new UsersModule(api),
  };
  return { api: modules };
}
