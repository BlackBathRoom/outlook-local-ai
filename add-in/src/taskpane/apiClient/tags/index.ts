import { BaseAPIClient } from "../shared";
import type { Tag } from "../../types";
import { registTagSchema, tagSchema } from "./schema";
import z from "zod";

type RegistTag = z.infer<typeof registTagSchema>;

export class TagClient extends BaseAPIClient {
  constructor() {
    super("tags");
  }

  public async get(): Promise<Tag[]> {
    return await this.fetchAPI("GET", { responseSchema: z.array(tagSchema) });
  }

  public async post(data: RegistTag): Promise<void> {
    await this.fetchAPI("POST", { requestBodySchema: registTagSchema, data });
  }
}
