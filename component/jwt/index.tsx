import axios from "axios";
import { CustomEvents } from "../../pages/_app"
export const SaveStorage = (url: string, data: any) => localStorage.setItem(url, JSON.stringify(data));
export const DelStorage = (key: string) => localStorage.removeItem(key);
export const GetStorage = (key: string, setState: Function | null = null): object | null => {
    let data = localStorage.getItem(key);
    let ret: object | null = null;
    if (data == null)
        return ret;
    try {
        ret = JSON.parse(data);
    } catch (e) {
        return ret;
    }
    if (!!setState) setState(ret);
    return ret;
};

export class Jwt {
    public static LastGetJwtTime: number = 0;

    //pub is public token ,use to access user's public information, like user's name, email, vatar etc.
    constructor(public sub: string, public jwt: string, public id: string, public pub: string, public temporaryAccount: string | null) { }
    IsValid(): boolean { return !!this["jwt"] && !!this["pub"] && !!this["id"]  }

    public static Get = (jwt = GetStorage("jwt")): Jwt => {
        var _jwt = Object.assign(new Jwt("", "", "", "", ""), jwt) as Jwt;
        return _jwt
    }
    public static Pub(): string { return Jwt.Get().pub }
    public static Nick(): string { return Jwt.Get().sub }
    public static Id(): string { return Jwt.Get().id }
    public static Clear = (): void => {
        SaveStorage("jwt", new Jwt("", "", "", "", ""));
        localStorage.removeItem("Authorization");
        Jwt.LastGetJwtTime = new Date().getTime() + Math.random();
        CustomEvents.LoginStatusDispatch(false);
    };
    public static Save = (data: Jwt): void => {
        SaveStorage("jwt", data);
        localStorage.setItem("Authorization", data.jwt || "");
        Jwt.LastGetJwtTime = new Date().getTime() + Math.random();

        CustomEvents.LoginStatusDispatch(data.IsValid());
    };
    public static SaveOrClear = (data: any): void => {
        let jwt = new Jwt(data["sub"], data["jwt"], data["id"], data["pub"], data["temporaryAccount"])
        jwt.IsValid() ? Jwt.Save(jwt) : Jwt.Clear();
    }
    public static SignOut = (e: any) => !!e.response && e.response.status === 401 && Jwt.SaveOrClear({});
}