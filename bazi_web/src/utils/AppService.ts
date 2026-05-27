import { get, HttpError, post } from './HttpUtil';

/**
 * 应用服务层
 * 封装后端 API 调用，提供统一的请求方法和错误处理
 * 所有静态方法均带 try-catch，出错时返回 null 而不抛异常
 */
export class AppService {

  /**
   * 发起 GET 请求
   * @param url 完整的请求地址
   * @returns 响应数据，失败时返回 null
   */
  static async getRequest(url: string) {
    try {
      const response = await get<{}>(
        url, null,
        5000 // 5秒超时
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`获取数据失败: ${error} - ${error.message}`);
      }
      return null;
    }
  }

  /**
   * 发起 POST 请求
   * @param url  完整的请求地址
   * @param data 请求体数据（可选，默认空对象）
   * @returns 响应数据，失败时返回 null
   */
  static async postRequest(url: string, data: Record<string, unknown> = {}) {
    try {
      const response = await post<{}>(
        url, data,
        5000 // 5秒超时
      );
      return response.data;
    } catch (error) {
      if (error instanceof HttpError) {
        console.error(`[POST] 请求失败 (${error.status}): ${url}`, error.message);
      } else if (error instanceof Error) {
        console.error(`[POST] 网络异常: ${url}`, error.message);
      } else {
        console.error(`[POST] 未知错误: ${url}`, error);
      }
      return null;
    }
  }
}
