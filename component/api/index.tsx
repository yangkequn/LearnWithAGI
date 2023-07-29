import axios from "axios";
import CustomEvents from "../customEvents";
import { Jwt } from "../jwt";
import { json } from "stream/consumers";
var msgpack = require('@ygoe/msgpack');
const JwtRequest = (headers: any = {}) => {
    let jwt = typeof window !== 'undefined' && localStorage.getItem("Authorization");
    if (!!jwt) headers["Authorization"] = jwt;
    let req = axios.create({ headers });
    req.interceptors.request.use(
        (config: any) => {
            if (config.method === "post" || config.method === "put") {
                //if type of data is Object ,convert to object
                if (typeof config.data === "object" && !(config.data instanceof Array)) config.data = Object.assign({}, config.data);
                config.data = msgpack.encode(config.data);
                //if config.data is uint8 array ,create new buffer of it's length and copy it to new buffer
                if (config.data instanceof Uint8Array) {
                    let buf = new ArrayBuffer(config.data.length);
                    let view = new Uint8Array(buf);
                    for (let i = 0; i < config.data.length; ++i) {
                        view[i] = config.data[i];
                    }
                    config.data = buf;
                }
                config.headers["Content-Type"] = "application/octet-stream";
            }
            return config;
        },
        (error: any) => {
            return Promise.reject(error);
        }
    );
    req.interceptors.response.use(
        (response: any) => {
            if ("data" in response) return response.data;
            return response
        },
        (error: any) => {
            SignOut(error);
            //if (headers.ReturnErr === true) return Promise.reject(error);
        }
    );
    return req
};
const SignOut = (e: any) => {
    var UnAuthorized = !!e.response && e.response.status === 401
    if (!UnAuthorized) return;
    let jwt = "", sub = "", id = "", LastGetJwtTime = new Date().getTime()
    localStorage.setItem("jwt", JSON.stringify({ jwt, sub, id, LastGetJwtTime }));
    Jwt.SaveOrClear({});
    CustomEvents.RedirectDispatch("/Auth?page=Login&to=" + window.location.pathname);
}
export enum Action { GET, PUT, DELETE, }
//RspType.json is server default
export enum RspType { json = "&RspType=application/json", jpeg = "&RspType=image/jpeg", ogg = "&RspType=audio/ogg", mpeg = "&RspType=video/mpeg", mp4 = "&RspType=video/mp4", none = "", text = "&RspType=text/plain", stream = "&RspType=application/octet-stream" }
//response fields.i.g. if response data in server is {a,b}, while ResponseFields is &RF=a, then response data will be {a}
// the default response fields is empty string, which means all fields will be returned
export enum ResponseFields { Null = "&RF=null", default = "" }
const Url = "https://api.iam26.com:3080/rSvc"
export enum Cmd { HEXISTS = "HEXISTS", HGET = "HGET", HGETALL = "HGETALL", HMGET = "HMGET" }
export const GetUrl = (cmd = Cmd.HGET, Key: string, Field: string = "", rspType: RspType = RspType.json, RspFields: string = ResponseFields.default) =>
    `${Url}/${cmd}/${Key}?F=${Field}${rspType}${RspFields}`
export const Time = () => JwtRequest().get(`${Url}/TIME/${new Date().getTime()}`)
export const HEXISTS = (Key: string, Field: string = "") =>
    JwtRequest().get(`${Url}/HEXISTS/${Key}?F=${Field}`)

export const HSET = (Key: string, Field: string = "", data: any, RspFields: string = ResponseFields.Null) =>
    JwtRequest().put(`${Url}/HSET/${Key}?F=${Field}${RspFields}`, data)

export const HGET = (Key: string, Field: string = "", RspFields: string = ResponseFields.default) => {
    if (!Key || Key == undefined) {
        debugger
    }
    return JwtRequest().get(`${Url}/HGET/${Key}?F=${Field}${RspFields}`)
}
export const HGETALL = (Key: string, RspFields: string = ResponseFields.default) =>
    JwtRequest().get(`${Url}/HGETALL/${Key}?${RspFields}`)
export const HVALS = (Key: string, RspFields: string = ResponseFields.default) =>
    JwtRequest().get(`${Url}/HVALS/${Key}?${RspFields}`)
export const HKEYS = (Key: string) =>
    JwtRequest().get(`${Url}/HKEYS/${Key}`)
export const HMGET = (Key: string, Fields: any[] = [], RspFields: string = ResponseFields.default) =>
    JwtRequest().get(`${Url}/HMGET/${Key}?F=${Fields.join(",")}${RspFields}`)

export const ZRange = (Key: string, Start: number, Stop: number, WITHSCORES: boolean = false) =>
    JwtRequest().get(`${Url}/ZRANGE/${Key}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)
export const ZREVRANGE = (Key: string, Start: number, Stop: number, WITHSCORES: boolean) =>
    JwtRequest().get(`${Url}/ZREVRANGE/${Key}?Start=${Start}&Stop=${Stop}&WITHSCORES=${WITHSCORES}`)
export const ZRank = (Key: string, Member: string) =>
    JwtRequest().get(`${Url}/ZRANK/${Key}?Member=${Member}`)
export const ZSCORE = (Key: string, Member: string) =>
    JwtRequest().get(`${Url}/ZSCORE/${Key}?Member=${Member}`)
export const ZRANGEBYSCORE = (Key: string, Min: number | string, Max: number | string, WITHSCORES: boolean) =>
    JwtRequest().get(`${Url}/ZRANGEBYSCORE/${Key}?Min=${Min}&Max=${Max}&WITHSCORES=${WITHSCORES}`)
export const ZREVRANGEBYSCORE = (Key: string, Max: number | string, Min: number | string, WITHSCORES: boolean) =>
    JwtRequest().get(`${Url}/ZREVRANGEBYSCORE/${Key}?Min=${Min}&Max=${Max}&WITHSCORES=${WITHSCORES}`)
export const ZADD = (Key: string, Score: number, Member: any) =>
    JwtRequest().post(`${Url}/ZADD/${Key}?Score=${Score}`, Member)

export const ZREM = (Key: string, Member: any) => {
    return JwtRequest().delete(`${Url}/ZREM/${Key}?Member=${Member}`)
}
export const ZREMRANGEBYSCORE = (Key: string, Min: number, Max: number) =>
    JwtRequest().delete(`${Url}/ZREMRANGEBYSCORE/${Key}?Min=${Min}&Max=${Max}`)

export const ZCOUNT = (Key: string, Min: number, Max: number) =>
    JwtRequest().get(`${Url}/ZCOUNT/${Key}?Min=${Min}&Max=${Max}`)
export const ZCARD = (Key: string) =>
    JwtRequest().get(`${Url}/ZCARD/${Key}`)
export const SISMEMBER = (Key: string, Member: string) => JwtRequest().get(`${Url}/SISMEMBER?K=${Key}?Member=${Member}`)
export const HDEL = async (Key: string, Field: string = "", RspFields: string = "") =>
    JwtRequest().delete(`${Url}/HDEL/${Key}?F=${Field}${RspFields}`)
export const API = async (serviceName: string, data: any = {}, RspFields: string = ResponseFields.default) => {
    //first character of Service should be lower case
    serviceName = serviceName[0].toLowerCase() + serviceName.slice(1)
    return JwtRequest().post(`${Url}/API/${serviceName}?${RspFields}`, data)
}