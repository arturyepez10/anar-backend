import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const validateData =
  (
    type: "body" | "query" | "params" | "headers" = "body",
    passWithErrors = false
  ) =>
  (...schemas: Joi.ObjectSchema<any>[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    let data: any;
    if (type === "body") {
      data = req.body;
    } else if (type === "query") {
      data = req.query;
    } else if (type === "params") {
      data = req.params;
    } else if (type === "headers") {
      data = req.headers;
    }

    const strictChecking = !!data.strictChecking;
    if (strictChecking) {
      delete data.strictChecking;
    }

    const dataErrors = schemas.flatMap((origSchema) => {
      const schema = strictChecking ? origSchema.unknown(false) : origSchema;
      const { error } = schema.validate(data, { abortEarly: false });
      if (error) {
        return error.details.map(({ path, message }) => {
          const pathStr = path
            .map((val) => String(val))
            .reduce((prev, curr) => `${prev}.${curr}`, `request.${type}`);

            return { path: pathStr, message }
        });
      }
      return [];
    });

    if (dataErrors.length) {
      if (!strictChecking && passWithErrors) {
        next();
      } else {
        res.json({
          errors: dataErrors
        });
      }
    } else {
      next();
    }
  };

export const validateBody = validateData("body");
export const validateQuery = validateData("query");
export const validateParams = validateData("params");
export const validateHeaders = validateData("headers");

export const validateBodyLogErrorsAndPass = validateData("body", true);
