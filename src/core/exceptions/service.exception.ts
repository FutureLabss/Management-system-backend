export class ServiceException extends Error {
  message: string;
  statusCode: number;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
  }
}
// export default ServiceException
