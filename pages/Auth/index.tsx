/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useContext, useEffect, useState } from "react";
import { Login } from "./login";
import { SignUp } from "./SignUp";
import { MyProfile } from "./my-profile";
import { ForgotPassword } from "./forgot-password";
import { AuthContextComponent } from "./AuthContext";
import "tailwindcss/tailwind.css"
import { AppFrame } from "@/component/AppFrame";
import { GlobalContext } from "@/pages/_app";
import { usePathname, useRouter } from "next/navigation";

export const AuthContainerCSS = "flex flex-col w-full max-w-3xl h-90 bg-cyan-900 items-center"
export const AuthContainerCSSL2 = "flex flex-col w-full bg-white text-black px-8 pt-8 text-lg mb-8"
export const AuthInputContainerCss = "flex flex-row w-full justify-between md-4"
export const AuthSingleLineInputCss = " mx-4 w-90"

export const AuthSubmitCss = "flex flex-row w-full mt-4 leading-6 h-9 bg-sky-500 justify-center text-white rounded "

export const AuthPages = { None: "None", SignUp: "SignUp", MyProfile: "MyProfile", ForgotPassword: "ForgotPassword", Login: "Login" }

const AuthPopper = () => {
    const { LoggedIn } = useContext(GlobalContext)
    const router = useRouter()
    useEffect(() => {
        console.info("LoggedIn", LoggedIn, AuthBoxPage)
        let pathName = window.location.href
        //if LoggedIn and current page is AuthPages.Login, redirect to home page
        if (LoggedIn && (AuthBoxPage === AuthPages.Login || AuthBoxPage === AuthPages.SignUp)) {
            //get to parameter from url
            let to = new URLSearchParams(window.location.search).get("to") ?? "/"
            router.push(to)
        }
    }, [LoggedIn])
    const [AuthBoxPage, SetAuthPage] = useState<string>(AuthPages.Login)
    const { SetOpenAlert, openAlert } = useState<string>("")
    return <AuthContextComponent>
        <AppFrame>
            <div className="flex flex-row items-start self-center justify-start w-full h-full">
                {AuthBoxPage === AuthPages.SignUp && <SignUp SetAuthPage={SetAuthPage} />}
                {AuthBoxPage === AuthPages.MyProfile && <MyProfile LoggedIn={true} />}
                {AuthBoxPage === AuthPages.ForgotPassword && <ForgotPassword SetAuthPage={SetAuthPage} />}
                {AuthBoxPage === AuthPages.Login && <Login SetAuthPage={SetAuthPage} SetOpenAlert={SetOpenAlert} openAlert={openAlert} />}
            </div>
        </AppFrame>
    </AuthContextComponent>
}
export default AuthPopper

