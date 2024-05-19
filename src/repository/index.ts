import type { Axios, AxiosRequestConfig, AxiosResponse } from "axios";

export interface RepositoryModule {}

export abstract class HttpModule implements RepositoryModule {
  protected api: Axios;

  constructor(api: Axios) {
    this.api = api;
  }

  async call<T>(
    method: string,
    url: string,
    data?: object | string,
    fetchOptions?: AxiosRequestConfig<string | object>
  ): Promise<AxiosResponse<T, any>> {
    return this.api.request<T>({
      url,
      method,
      data,
      ...fetchOptions,
    });
  }
}

export abstract class MockModule implements RepositoryModule {}
