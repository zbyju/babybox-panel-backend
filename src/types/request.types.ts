export interface EngineDataBodyRequest {
  url: string;
  timeout?: number;
}

export function isInstanceOfEngineDataBodyRequest(
  data: any
): data is EngineDataBodyRequest {
  return "url" in data;
}

export interface ThermalDataBodyRequest {
  url: string;
  timeout?: number;
}

export function isInstanceOfThermalDataBodyRequest(
  data: any
): data is ThermalDataBodyRequest {
  return "url" in data;
}
