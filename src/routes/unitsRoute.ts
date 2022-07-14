import * as express from "express";
import { Request, Response } from "express";
import {
  CommonSettingsResponse,
  isInstanceOfArraySetting,
  SettingResult,
} from "../types/request.types";
import { Action, Unit } from "../types/units.types";
import { stringToAction } from "../utils/actions";
import {
  fetchAction,
  fetchDataCommon,
  fetchSettings,
} from "../utils/fetchDataCommon";

export const router = express.Router();

router.get("/data", async (req: Request, res: Response) => {
  const response = await fetchDataCommon(Unit.Thermal, req.query);

  if (response.data) {
    return res.status(response.status).send({
      msg: response.msg,
      data: response.data,
    });
  } else {
    return res.status(response.status).send({
      msg: response.msg,
      data: response.data,
    });
  }
});

router.get("/actions/:action", async (req, res) => {
  const action = stringToAction(req.params.action);

  if (action === undefined) {
    return res.status(400).send({ msg: "Unknown action" });
  }

  const response = await fetchAction(action);
  return res.status(response.status).send({ msg: response.msg });
});

router.put("/settings", async (req, res) => {
  if (!isInstanceOfArraySetting(req.body)) {
    return res.status(400).send({
      msg: "The body needs to be an array of settings ({index: number, value: number, unit: 'engine' | 'thermal'}).",
    });
  }

  const results: SettingResult[] = await fetchSettings(req.body, 5, 5000);
  const response: CommonSettingsResponse = results.every((r) => r.result)
    ? {
        status: 200,
        msg: "All setting changes have been applied.",
        results,
      }
    : results.every((r) => !r.result)
    ? {
        status: 500,
        msg: "All setting changes failed.",
        results,
      }
    : {
        status: 206,
        msg: "Some setting changes failed, some were successful.",
        results,
      };
  return res
    .status(response.status)
    .send({ msg: response.msg, results: response.results });
});
