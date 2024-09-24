/*
 *当前日期：星期二
 *文件路径：src/config/transform.interceptor.ts
 *IDE 名称：WebStorm
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Observable, map, catchError, throwError } from 'rxjs';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    const request = context.switchToHttp().getRequest();
    console.log(request);
    // const customMessage = request.body.customMessage || 'Request successful'; // 从请求体中获取自定义消息
    return next.handle().pipe(
      map((data) => {
        // 确保返回的data包含message
        const message = data.message || '请求成功'; // 使用默认消息
        return {
          code: 0,
          success: true,
          message,
          data: data.result,
        };
      }),
      catchError((error) => {
        let responseDto: ResponseDto<any>;
        if (error instanceof HttpException) {
          responseDto = {
            code: 500,
            success: false,
            message: error.message,
          };
        } else if (error instanceof BadRequestException) {
          responseDto = {
            code: 500,
            data: null,
            success: false,
            message: error.message,
          };
        }
        // const responseDto: ResponseDto<any> = {
        //   code: 500,
        //   data: null,
        //   success: false,
        //   message: error.message,
        // };
        return throwError(
          () =>
            new HttpException(
              responseDto,
              error.getStatus ? error.getStatus() : 500,
            ),
        );
      }),
    );
  }
}
