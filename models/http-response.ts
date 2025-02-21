export class APIResponse {
  success: boolean;
  data: any;
  status: number;
  message?: string;
  respTime?: string;

  constructor(
    success: boolean,
    data: any,
    status: number,
    message?: string,
    respTime?: string
  ) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.status = status;
    this.respTime = respTime;
  }
}
