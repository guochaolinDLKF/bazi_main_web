import {get, HttpError, post} from './HttpUtil.ts';
export class AppService {

    static async getRequest(url:string) {
        try {
            const response = await get<{}>(
                url,null,
                5000
            );
            return response.data;
        } catch (error) {
            if (error instanceof HttpError) {
                console.error(`获取数据失败: ${error} - ${error.message}`);
            }
            return null;
        }
    }

    static async postRequest(url:string) {
        try {
            const response = await post<{}>(
                url,null,
                5000
            );
            return response.data;
        } catch (error) {
            if (error instanceof HttpError) {
                console.error(`获取数据失败: ${error} - ${error.message}`);
            }
            return null;
        }
    }
}