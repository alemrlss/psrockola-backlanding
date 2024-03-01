import { Response } from "express";
import { json } from "body-parser";
import { Request } from "express";

interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}
function rawBodyMiddleware() {
  return json({
    verify: (
      request: RequestWithRawBody,
      response: Response,
      buffer: Buffer
    ) => {
      if (request.url === "/api/stripe/webhook" && Buffer.isBuffer(buffer)) {
        request.rawBody = Buffer.from(buffer);
      }
      return true;
    },
  });
}

export default rawBodyMiddleware;
