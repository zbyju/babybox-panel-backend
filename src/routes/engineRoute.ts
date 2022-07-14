import * as express from "express";
import { Request, Response } from "express";
import { fetchAction, fetchDataCommon } from "../utils/fetchDataCommon";
import { Action, Unit } from "../types/units.types";
import { stringToAction } from "../utils/actions";

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
