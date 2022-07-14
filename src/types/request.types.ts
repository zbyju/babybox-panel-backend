import { Unit } from "./units.types";

export interface EngineDataBodyRequest {
  timeout?: number;
}

export interface ThermalDataBodyRequest {
  timeout?: number;
}

export interface CommonDataResponse {
  status: number;
  msg: string;
  data?: any;
}

export interface Setting {
  index: number;
  value: number;
  unit: Unit;
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
