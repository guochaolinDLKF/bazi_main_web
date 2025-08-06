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
    constructor(status: number, message: string) {
        super(message);
        console.error("status: ", status);
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
            headers: { 'Content-Type': 'application/json' },
        };

        if (data && method !== 'GET') {
            config.body = JSON.stringify(data);
        } else if (data && method === 'GET') {
            url += '?' + new URLSearchParams(data).toString();
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
        console.log(error);
        if (error instanceof HttpError) {
            console.error(error);
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

export const del = <T = any>(url: string, timeout?: number) =>
    httpRequest<T>(url, 'DELETE', undefined, timeout);

export default { post, get,put,del };