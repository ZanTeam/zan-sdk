import { ZANInvalidInputParams } from "@/lib/errors/ZANInvalidInputParams";
import { ZodType } from "zod";

export const validateConfig = (args: unknown, schema: ZodType<unknown>) => {
  const validation = schema.safeParse(args);
  if (!validation.success) {
    throw new ZANInvalidInputParams(validation.error);
  }
};
