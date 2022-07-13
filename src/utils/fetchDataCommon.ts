import { fetchFromUrl } from "../fetch/fetch";
import {
  CommonDataResponse,
  EngineDataBodyRequest,
} from "../types/request.types";
import { Action, Unit } from "../types/units.types";
import { actionToUrl } from "./actions";

export async function fetchDataCommon(
  unit: Unit,
  query: unknown
): Promise<CommonDataResponse> {
  const { timeout = parseInt(process.env.DEFAULT_FETCH_TIMEOUT) || 5000 } =
    query as EngineDataBodyRequest;

  const url = `http://${
    unit === Unit.Engine
      ? process.env.ENGINE_UNIT_IP
      : process.env.THERMAL_UNIT_IP
  }/get_ram[0]?rn=60`;

  try {
    const data = await fetchFromUrl(url, timeout);
    return {
      status: 200,
      msg: "Data fetched successfully.",
      data: data.data,
    };
  } catch (err) {
    return {
      status: 408,
      msg: "Request timedout. The URL/IP might be wrong, check the config.",
    };
  }
}

export async function fetchAction(action: Action): Promise<CommonDataResponse> {
  const timeout = parseInt(process.env.DEFAULT_FETCH_TIMEOUT) || 5000;

  const url = actionToUrl(action);

  try {
    const data = await fetchFromUrl(url, timeout);
    return {
      status: 200,
      msg: "Action sent successfully.",
      data: data.data,
    };
  } catch (err) {
    return {
      status: 408,
      msg: "Request timedout. The URL/IP might be wrong, check the config.",
    };
  }
}
