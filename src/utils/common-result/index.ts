function success(data: any, message = "success", code = 200) {
  return {
    code,
    message,
    data: data,
  };
}

function fail(message = "fail", data: any = null, code = 500) {
  return {
    code,
    message,
    data: data,
  };
}

export { success, fail };
