
import React, { ReactComponentElement, useEffect, useState } from 'react';
import './globals.css'
import { Jwt } from "../component/jwt"
import type { AppProps /*, AppContext */ } from 'next/app'
import App from 'next/app'
import CustomEvents from '../component/customEvents';
import { API } from '@/component/api';
import Router from 'next/router';

interface GlobalContextType {
  LoggedIn: boolean,
  // UpdateJWT: (removeJWT?: boolean) => void;
  // SignOut: (e: any) => void;
  RedirectUrl: string,
  setRedirectUrl: React.Dispatch<React.SetStateAction<string>>,

  openAlert: string,
  setOpenAlert: React.Dispatch<React.SetStateAction<string>>,
  MenuL2: any,
  setMenuL2: React.Dispatch<React.SetStateAction<any>>,
  creditTM: number,
  setCreditTM: React.Dispatch<React.SetStateAction<number>>,
  quota: any,
  setQuota: React.Dispatch<React.SetStateAction<any>>
  debugMode: number,
  Params: any
}
// export const GlobalContext = React.createContext<GlobalContextType>({
//   LoggedIn: false, RedirectUrl: "", setRedirectUrl: e => null, openAlert: false, SetOpenAlert: e => null, MenuL2: null, setMenuL2: e => null, creditTM: 0, setCreditTM: e => null
// });
export const GlobalContext = React.createContext<GlobalContextType>({
  LoggedIn: false, // default value
  RedirectUrl: '', // default value
  setRedirectUrl: () => { }, // default function
  openAlert: '', // default value
  setOpenAlert: () => { }, // default function
  MenuL2: null, // default value
  setMenuL2: () => { }, // default function
  creditTM: 0, // default value
  setCreditTM: () => { }, // default function
  quota: null, // default value
  setQuota: () => { }, // default function
  debugMode: 0, // default value
  Params: {}, // default value
});
//export const GlobalContext = React.createContext<GlobalContextType >(undefined);

function MyApp({ Component, pageProps }: AppProps) {
  //const [LoggedIn, setLoggedIn] = useState(Jwt.Get().IsValid())
  const [LoggedIn, setLoggedIn] = useState(false)
  const [RedirectUrl, setRedirectUrl] = useState("")
  const [openAlert, setOpenAlert] = React.useState("");
  const [MenuL2, setMenuL2] = useState(null)
  const [creditTM, setCreditTM] = useState(0)
  const [debugMode, setDebugMode] = useState(0)
  const [quota, setQuota] = useState({ AllowedDayGPT4: 0, AllowedDayGPT35: 0, AllowedDaySkill: 0 } as any)
  const [Params, setParams] = useState({} as any)

  const refreshQuota = () => API("OrderQuota", { Action: 0 }).then((data) => !!data && setQuota(data))
  useEffect(() => {
    //refresh quota every 5 minutes
    setInterval(() => refreshQuota, 300000);
    //refresh quota on load
    refreshQuota()
  }, [])

  useEffect(() => {
    setLoggedIn(Jwt.Get().IsValid())

    //handle event for:   dispatchEvent(new CustomEvent(Events.Login, { detail: { status: data.IsValid() } }));
    window.addEventListener(CustomEvents.LoginStatus, (event: Event) => {
      const status = (event as CustomEvent).detail.status
      setLoggedIn(status)
    })
    //handle event for:     dispatchEvent(new CustomEvent("auth", { detail: { page: AuthPage } }));
    window.addEventListener(CustomEvents.Redirect, (event: Event) => {
      const page = (event as CustomEvent).detail.page
      setRedirectUrl(page)
    })
    return () => {
      // window.removeEventListener(Jwt.eventName, LoadJwt)
      // window.removeEventListener(HeartBeat.EventName, LoadHeartRate)
    }
  }, [])
  useEffect(() => {
    if (!openAlert) return
    //Auto close alert after 3 seconds
    setTimeout(() => { setOpenAlert(""); }, 5000);
  }, [openAlert])
  useEffect(() => {
    //listen to key press event, if press ctrl +(dbg) then toggle debug mode
    const keyPress = (e: KeyboardEvent) => {
      //如果已经是debugMode,只要不按ctrl，那么一直是这种模式
      if (!e.ctrlKey) return
      if (e.key == "d" && debugMode == 0) return setDebugMode(1)
      if (e.key == "b" && debugMode == 1) return setDebugMode(2)
      if (e.key == "g" && debugMode == 2) return setDebugMode(3)
      return setDebugMode(0)
    }
    window.addEventListener("keydown", keyPress)
    return () => {
      window.removeEventListener("keydown", keyPress)
    }
  }, [debugMode])
  //update url params in client side
  useEffect(() => {
    // monitor Params of url
    const paramsToObject = (entries: Iterable<[string, string]>) => {
      let result: Record<string, string | string[]> = {};

      for (let [key, value] of entries) {
        // If the object already has the key then push the new value to the array
        if (result[key]) {
          if (Array.isArray(result[key])) {
            (result[key] as string[]).push(value);
          } else {
            result[key] = [result[key] as string, value];
          }
        } else {
          result[key] = value;
        }
      }
      return result;
    }

    const dispatchUrlChange = () => {
      // Get the new URL parameters or any other URL info you need
      const params = new URLSearchParams(window.location.search);
      const paramsObject = paramsToObject(params.entries());
      setParams(paramsObject);
    }

    const routeChangeStartCallback = (url: string) => {
      let param = new URLSearchParams(url.split("?")[1] ?? "");
      const paramsObject = paramsToObject(param.entries());
      setParams(paramsObject);
    }

    window.addEventListener("popstate", dispatchUrlChange);
    Router.events.on('routeChangeStart', routeChangeStartCallback);

    dispatchUrlChange();
    return () => {
      window.removeEventListener("popstate", dispatchUrlChange);
      Router.events.off('routeChangeStart', routeChangeStartCallback); // Use the correct callback here
    }
  }, [])

  const store = {
    LoggedIn,
    RedirectUrl,
    setRedirectUrl,
    openAlert, setOpenAlert,
    MenuL2, setMenuL2,
    creditTM, setCreditTM,
    quota, setQuota,
    debugMode,
    Params
  }
  return <GlobalContext.Provider value={store} >
    <Component {...pageProps} />
  </GlobalContext.Provider>
}
export default MyApp
