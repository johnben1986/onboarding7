export class UserError extends Error {
  constructor(messageOrParams) {
    const params =
      typeof messageOrParams === "string"
        ? { message: messageOrParams }
        : messageOrParams;
    super(params.message);
    this.type = "UserError";
    this.code = params.code;
  }
}
