/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useContext, useEffect, useState } from "react";
import Login from "./login";
import SignUp from "./SignUp";
import ForgotPassword from "./forgot-password";
import AuthContextComponent, { AuthContext } from "./AuthContext";
import AppFrame from "../../component/appFrame"
import { GlobalContext } from "../_app";
import { usePathname, useRouter } from "next/navigation";
import { AuthPages } from "./consts";

const AuthFrame = () => {
    const { Params, LoggedIn, setMenuL2 } = useContext(GlobalContext)
    let { page, to } = Params
    const router = useRouter()
    useEffect(() => {
        setMenuL2(<div></div>)
        //if LoggedIn and current page is AuthPages.Login, redirect to home page
        if (!LoggedIn || !(page === AuthPages.Login || page === AuthPages.SignUp)) return
        router.push(to)
    }, [LoggedIn])
    return <div className="flex flex-row items-start self-center justify-center w-full h-full mt-4 ">
        {page === AuthPages.SignUp && <SignUp To={to} />}
        {page === AuthPages.ForgotPassword && <ForgotPassword To={to} />}
        {page === AuthPages.Login && <Login To={to} />}
    </div>
}
export default function AuthPopper({ AuthPage, To }: { AuthPage: string, To: string }) {
    return <AuthContextComponent>
        <AppFrame>
            <AuthFrame />
        </AppFrame>
    </AuthContextComponent>
}