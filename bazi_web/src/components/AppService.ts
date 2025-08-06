import {get, HttpError} from './HttpUtil.ts';
export class AppService {

    static async cfgRequest(url:string) {
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

}