import { Unit } from "./units.types";

export interface EngineDataBodyRequest {
  timeout?: number;
}

export interface ThermalDataBodyRequest {
  timeout?: number;
}

export interface PostUnitSettingsBodyRequest {
  settings: Setting[];
  options?: {
    timeout?: number;
  };
}

export function isInstanceOfPostUnitSettingsBodyRequest(
  object: any
): object is PostUnitSettingsBodyRequest {
  return "settings" in object && isInstanceOfArraySetting(object.settings);
}

export interface GetUnitSettingsRequest {
  unit?: Unit;
  timeout?: number;
}

export function isInstanceOfGetUnitSettingsRequest(
  object: any
): object is GetUnitSettingsRequest {
  if (object.unit && object.unit !== "engine" && object.unit !== "thermal") {
    return false;
  }
  return true;
}

export interface CommonResponse {
  msg: string;
  status: number;
}

export interface CommonDataResponse extends CommonResponse {
  data?: any;
}

export interface CommonSettingsResponse extends CommonResponse {
  results: SettingResult[];
}

export interface Setting {
  index: number;
  value: number;
  unit: Unit;
}

export interface SettingResult extends Setting {
  result: boolean;
}

export function isInstanceOfSetting(object: any): object is Setting {
  return (
    "index" in object &&
    "value" in object &&
    "unit" in object &&
    Number.isInteger(object.index) &&
    Number.isFinite(object.value) &&
    (object.unit === "engine" || object.unit === "thermal")
  );
}

export function isInstanceOfArraySetting(object: any): object is Setting[] {
  return (
    Array.isArray(object) && object.every((o: any) => isInstanceOfSetting(o))
  );
}
