import z from "zod";

export const API_BASE_URL = "http://localhost:8000/api";

export class BaseAPIClient {
  protected url: `${typeof API_BASE_URL}/${string}`;

  constructor(resource: string) {
    this.url = `${API_BASE_URL}/${resource}`;
  }

  protected async fetchAPI<TRequestBody = unknown, TResponse = unknown>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    options: {
      requestBodySchema?: z.ZodType<TRequestBody>;
      responseSchema?: z.ZodType<TResponse>;
      data?: TRequestBody;
    } = {}
  ): Promise<TResponse> {
    const requestBody =
      options.requestBodySchema !== undefined
        ? options.requestBodySchema.parse(options.data)
        : options.data;

    return fetch(this.url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody !== undefined ? JSON.stringify(requestBody) : undefined,
    })
      .then((res) => res.json())
      .then((data) => {
        if (options.responseSchema !== undefined) {
          return options.responseSchema.parse(data);
        }
        return data;
      })
      .catch((error) => {
        throw new Error(`API request failed: ${error.message}`);
      });
  }
}
