import { fetchFromUrl } from "../fetch/fetch";
import {
  CommonDataResponse,
  EngineDataBodyRequest,
  Setting,
} from "../types/request.types";
import { Action, Unit } from "../types/units.types";
import { actionToUrl, unitToIp } from "./url";

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

export async function fetchSettings(
  settings: Setting[],
  tryNumber = 1,
  timeout = 5000
) {
  settings.forEach(async (s) => {
    const ip = unitToIp(s.unit);
    const timestamp = new Date().getTime();
    const result = await updateSettings(
      `http://${ip}/sdscep?sys141=${s.index}&${timestamp}`,
      `http://${ip}/sdscep?sys140=${s.value}&${timestamp}`
    );
    console.log(result);
  });
}

async function updateSettings(
  urlIndex: string,
  urlValue: string,
  timeout = 5000
): Promise<boolean> {
  const indexFetch = fetchFromUrl(urlIndex, timeout);
  const valueFetch = fetchFromUrl(urlValue, timeout);
  const result = await Promise.all([indexFetch, valueFetch]);
  console.log(result);
  return true;
}
