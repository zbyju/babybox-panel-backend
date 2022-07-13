import * as express from "express";
import { Request, Response } from "express";
import axios from "axios";
import {
  EngineDataBodyRequest,
  isInstanceOfEngineDataBodyRequest,
} from "../types/request.types";
import { fetchFromUrl } from "../fetch/fetch";

export const router = express.Router();

router.get("/data", async (req: Request, res: Response) => {
  const query: unknown = req.query;

  if (!isInstanceOfEngineDataBodyRequest(query) || !query.url) {
    return res
      .status(400)
      .send({ status: 400, msg: "No url specified in query string" });
  }

  const { url, timeout = parseInt(process.env.DEFAULT_FETCH_TIMEOUT) || 5000 } =
    query as EngineDataBodyRequest;

  try {
    const data = await fetchFromUrl(url, timeout);
    return res.send(data.data);
  } catch (err) {
    return res.status(408).send({
      status: 408,
      msg: "Request timedout. The URL/IP might be wrong, check the config.",
    });
  }
});
