import * as express from "express";
import { Request, Response } from "express";
import { fetchDataCommon } from "../utils/fetchDataCommon";
import { Unit } from "../types/units.types";

export const router = express.Router();

router.get("/data", async (req: Request, res: Response) => {
  const response = await fetchDataCommon(Unit.Engine, req.query);

  if (response.data) {
    return res.status(response.status).send({
      msg: response.msg,
      data: response.data,
    });
  } else {
    return res.status(response.status).send({
      msg: response.msg,
    });
  }
});
