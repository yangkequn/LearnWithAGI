
import React from 'react';

const CustomEvents = {
    UpdateJWT: "UpdateJWT",
    LoginStatus: "Login",
    Redirect: "Redirect",
    LoginStatusDispatch: (data: boolean) => dispatchEvent(new CustomEvent(CustomEvents.LoginStatus, { detail: { status: data } })),
    RedirectDispatch: (AuthPage: string) => dispatchEvent(new CustomEvent(CustomEvents.Redirect, { detail: { page: AuthPage } })),
}
export default CustomEvents;
