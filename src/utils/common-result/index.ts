import { toCamelCase } from "../to-camel-case/index.ts";

function success(data: any, message = "success", code = 200) {
  return {
    code,
    message,
    data: toCamelCase(data),
  };
}

function fail(message = "fail", data: any = null, code = 500) {
  return {
    code,
    message,
    data: toCamelCase(data),
  };
}

export { success, fail };
