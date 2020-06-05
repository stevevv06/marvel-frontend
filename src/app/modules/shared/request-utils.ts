import { HttpParams } from '@angular/common/http';
import { AppConstants } from '../../app.constants';
import {Md5} from 'ts-md5/dist/md5';

export class RequestUtils {

    public static createAuthParams(): HttpParams {
        let authParams: HttpParams;
        let ts: number = Date.now();
        let hash = RequestUtils.md5(ts + AppConstants.PRIVATE_API_KEY + AppConstants.API_KEY);
        authParams = new HttpParams()
            .set('apikey',AppConstants.API_KEY)
            .set('ts', ts.toString())
            .set('hash', hash);
        return authParams;
    }

    public static createAuthParamsAndAdd(params: any) {
        let p: HttpParams = this.createAuthParams();
        if(params){
            Object.keys(params).forEach((key) => {
                p = p.set(key, params[key]);
            });
        }
        return p;
    }

    public static md5(contents: string): string {
        const md5 = new Md5();
        return md5.appendStr(contents).end().toString();
    }
}