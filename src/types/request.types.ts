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
