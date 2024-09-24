/*
 *当前日期：星期二
 *文件路径：src/config/dto/response.dto.ts
 *IDE 名称：WebStorm
 */

export interface ResponseDto<T> {
  code: number;
  success: boolean;
  message?: string | null;
  data?: T;
}
