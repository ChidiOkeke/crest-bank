import { Response } from 'express';
import { errors, responses, status } from './messages.util';
import httpStatus from 'http-status';

class FormatResponse {
  
  static created(message = responses.success,data: any,  statusCode = httpStatus.CREATED) {
    return {
      statusCode,
      body: {
        success: status.success,
        message,
        data,
      }
    };
  }

  static ok(message = responses.success, data: any,  statusCode = httpStatus.OK) {
    return {
      statusCode,
      body: {
        success: status.success,
        message,
        data,
      }

    };
  }

  static interalServerError(message = errors.internalServerError, statusCode = httpStatus.INTERNAL_SERVER_ERROR) {

    return {
      statusCode,
      body: {
        success: status.failed,
        message,
      }

    };
  }
  static notFound(message = errors.notFound, statusCode = httpStatus.NOT_FOUND) {

    return {
      statusCode,
      body: {
        success: status.failed,
        message,
      }

    };
  }

  static badRequest(message= errors.badRequest, statusCode = httpStatus.BAD_REQUEST) {

    return {
      statusCode,
      body: {
        success: status.failed,
        message,
      }
    };
  }
}

export default FormatResponse;
