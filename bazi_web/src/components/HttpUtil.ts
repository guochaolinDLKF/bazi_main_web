/**
 * HTTP请求工具模块
 * 支持GET/POST/PUT/DELETE方法
 * 包含超时处理和错误处理
 */

// 定义响应数据结构
export interface ApiResponse<T = any> {
    status: number;
    data: T;
    message?: string;
}

// 定义错误类型
export class HttpError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = 'HttpError';
    }
}

/**
 * 核心HTTP请求函数
 * @param url 请求URL
 * @param method HTTP方法
 * @param data 请求数据
 * @param timeout 超时时间(ms)
 */
export async function httpRequest<T = any>(
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: any,
    timeout: number = 5000
): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const config: RequestInit = {
            method,
            signal: controller.signal,
            headers: {},
        };

        // 区分GET和其他方法的处理
        if (method === 'GET') {
            // GET请求：参数拼接到URL
            if (data) {
                const params = new URLSearchParams(data).toString();
                url += (url.includes('?') ? '&' : '?') + params;
            }
            // GET请求不设置Content-Type，避免触发预检
        } else {
            // 非GET请求：设置JSON内容类型
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

        if (!response.ok) {
            throw new HttpError(response.status, `HTTP错误! 状态码: ${response.status}`);
        }

        const responseData = await response.json();
        return { status: response.status, data: responseData };
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof HttpError) {
            throw error;
        }

        if (error instanceof DOMException && error.name === 'AbortError') {
            throw new HttpError(408, `请求超时: ${timeout}ms`);
        }

        // 通用错误处理（含网络错误）
        const status = 500;
        const message = (error instanceof Error)
            ? `网络错误: ${error.message}`
            : `未知网络错误`;
        throw new HttpError(status, message);
    }
}

// 便捷方法封装
export const get = <T = any>(url: string, params?: any, timeout?: number) =>
    httpRequest<T>(url, 'GET', params, timeout);

export const post = <T = any>(url: string, data: any, timeout?: number) =>
    httpRequest<T>(url, 'POST', data, timeout);

export const put = <T = any>(url: string, data: any, timeout?: number) =>
    httpRequest<T>(url, 'PUT', data, timeout);

export const del = <T = any>(url: string, data?: any, timeout?: number) =>
    httpRequest<T>(url, 'DELETE', data, timeout);

export default { get, post, put, del };