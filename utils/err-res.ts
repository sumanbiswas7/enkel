export function errRes(error: any) {
  console.error("⚠️ " + error);

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
