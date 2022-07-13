import { Action } from "../types/units.types";

export function actionToUrl(action: Action): string | undefined {
  switch (action) {
    case Action.OpenDoors:
      return `http://${process.env.ENGINE_UNIT_IP}/sdscep?sys141=201`;
    case Action.OpenServiceDoors:
      return `http://${process.env.ENGINE_UNIT_IP}/sdscep?sys141=202`;
    default:
      return undefined;
  }
}

function enumFromStringValue<T>(
  enm: { [s: string]: T },
  value: string
): T | undefined {
  return (Object.values(enm) as unknown as string[]).includes(value)
    ? (value as unknown as T)
    : undefined;
}

export function stringToAction(str: string): Action | undefined {
  return enumFromStringValue(Action, str.toLowerCase());
}
