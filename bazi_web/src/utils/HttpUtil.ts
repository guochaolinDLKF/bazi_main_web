/**
 * HTTP请求工具模块
 * 基于原生 fetch API 封装，支持 GET/POST/PUT/DELETE 方法
 * 包含超时控制（AbortController）和统一的错误处理
 */

/** 统一响应数据结构 */
export interface ApiResponse<T = any> {
    status: number;
    data: T;
    message?: string;
}

/** 自定义 HTTP 错误类型，携带 HTTP 状态码 */
export class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

/**
 * 核心 HTTP 请求函数
 * 所有请求均通过此函数发出，自动处理超时、错误分类
 *
 * @param url     请求 URL
 * @param method  HTTP 方法（GET/POST/PUT/DELETE）
 * @param data    请求数据（GET 时拼到 URL，其他方法放 body）
 * @param timeout 超时时间，单位毫秒，默认 5000
 * @returns 包装后的响应对象 { status, data }
 */
export async function httpRequest<T = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    timeout: number = 5000
): Promise<ApiResponse<T>> {
    // 创建 AbortController 用于超时控制
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const config: RequestInit = {
            method,
            signal: controller.signal, // 绑定取消信号
            headers: {},
        };

        if (method === 'GET') {
            // GET 请求：将参数拼接到 URL 查询字符串
            if (data) {
                const params = new URLSearchParams(data).toString();
                url += (url.includes('?') ? '&' : '?') + params;
            }
            // GET 请求不主动设置 Content-Type，避免触发 CORS 预检请求
        } else {
            // 非 GET 请求：设置 JSON 内容类型
            config.headers = {
                'Content-Type': 'application/json',
                ...config.headers,
            };
            if (data) {
                config.body = JSON.stringify(data);
            }
        }

        const response = await fetch(url, config);
        clearTimeout(timeoutId);

        // 非 2xx 状态码视为错误
        if (!response.ok) {
            throw new HttpError(response.status, `HTTP错误! 状态码: ${response.status}`);
        }

        const responseData = await response.json();
        return { status: response.status, data: responseData };

    } catch (error) {
        clearTimeout(timeoutId);

        // 已是 HttpError 直接抛出
        if (error instanceof HttpError) {
            throw error;
        }

        // AbortController 超时触发的错误
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new HttpError(408, `请求超时: ${timeout}ms`);
        }

        // 其余错误统一包装为网络错误
        const status = 500;
        const message = (error instanceof Error)
            ? `网络错误: ${error.message}`
            : `未知网络错误`;
        throw new HttpError(status, message);
    }
}

// ---- 便捷方法封装 ----

/** GET 请求快捷方法 */
export const get = <T = any>(url: string, params?: any, timeout?: number) =>
    httpRequest<T>(url, 'GET', params, timeout);

/** POST 请求快捷方法 */
export const post = <T = any>(url: string, data: any, timeout?: number) =>
    httpRequest<T>(url, 'POST', data, timeout);

/** PUT 请求快捷方法 */
export const put = <T = any>(url: string, data: any, timeout?: number) =>
    httpRequest<T>(url, 'PUT', data, timeout);

/** DELETE 请求快捷方法 */
export const del = <T = any>(url: string, data?: any, timeout?: number) =>
    httpRequest<T>(url, 'DELETE', data, timeout);

export default { get, post, put, del };
