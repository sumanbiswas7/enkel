import clc from "cli-color";

export function errRes(error: any) {
  console.log(clc.red(error));
  console.log(error);

  const data = error.data || null;
  const message = error.message || "Internal Server Error";

  return {
    isError: true,
    success: false,
    data,
    message,
    status: error.statusCode ?? 500,
  };
}
