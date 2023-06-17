
import React, { ReactComponentElement, useEffect, useState } from 'react';
import { AuthPages } from "../component/Auth";
import { Jwt } from "../component/jwt"
import type { AppProps /*, AppContext */ } from 'next/app'
import App from 'next/app'

export const CustomEvents = {
  UpdateJWT: "UpdateJWT",
  LoginStatus: "Login",
  Redirect: "Redirect",
  LoginStatusDispatch: (data: boolean) => dispatchEvent(new CustomEvent(CustomEvents.LoginStatus, { detail: { status: data } })),
  RedirectDispatch: (AuthPage: string) => dispatchEvent(new CustomEvent(CustomEvents.Redirect, { detail: { page: AuthPage } })),

}

interface GlobalContextType {
  LoggedIn: boolean,
  // UpdateJWT: (removeJWT?: boolean) => void;
  // SignOut: (e: any) => void;
  RedirectUrl: string,
  setRedirectUrl: React.Dispatch<React.SetStateAction<string>>,

  openAlert: boolean,
  SetOpenAlert: (timeOut: number) => void
  MenuL2: any,
  setMenuL2: any

}
export const GlobalContext = React.createContext<GlobalContextType>({
  LoggedIn: false, RedirectUrl: "", setRedirectUrl: e => null, openAlert: "", SetOpenAlert: e => null
});


function MyApp({ Component, pageProps }: AppProps) {
  //const [LoggedIn, setLoggedIn] = useState(Jwt.Get().IsValid())
  const [LoggedIn, setLoggedIn] = useState(false)

  const [RedirectUrl, setRedirectUrl] = useState("")

  const [openAlert, setOpenAlert] = React.useState(false);
  const [MenuL2, setMenuL2] = useState(null)


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
  const SetOpenAlert = (timeOut: number = 10 * 1000) => {
    setOpenAlert(true);
    setTimeout(() => { setOpenAlert(false); }, timeOut);
  };
  const store = {
    LoggedIn,
    RedirectUrl,
    setRedirectUrl,
    openAlert, SetOpenAlert,
    MenuL2, setMenuL2
  }
  return <GlobalContext.Provider value={store} >
    <Component {...pageProps} />
  </GlobalContext.Provider>
}
export default MyApp
