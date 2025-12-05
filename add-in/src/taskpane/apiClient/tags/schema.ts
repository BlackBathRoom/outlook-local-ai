import z from "zod";

const registTagSchema = z.object({
  name: z.string(),
});

const tagSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export { registTagSchema, tagSchema };
