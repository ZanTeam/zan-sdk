import { ZodError } from "zod";

export class ZANInvalidInputParams extends Error {
  constructor(baseError: ZodError) {
    const messages = baseError.errors.map(
      (error) =>
        `${error.path.length > 0 ? error.path + ": " : ""}${error.message}`
    );
    super(`Invalid input parameters, ${messages.join(", ")}`);
  }
}
