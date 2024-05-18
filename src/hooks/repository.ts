import { api } from "@/lib/axios";

export type Repository = {};

export default function useRepository() {
  const modules: Repository = {};
  return { api: modules };
}
