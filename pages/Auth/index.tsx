/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useContext, useEffect, useState } from "react";
import Login from "./login";
import SignUp from "./SignUp";
import MyProfile from "./my-profile";
import ForgotPassword from "./forgot-password";
import AuthContextComponent, { AuthContext } from "./AuthContext";
import "tailwindcss/tailwind.css"
import AppFrame from "../../component/appFrame"
import { GlobalContext } from "../_app";
import { usePathname, useRouter } from "next/navigation";

export const AuthContainerCSS = "flex flex-col w-full max-w-3xl h-90 bg-cyan-900 items-center"
export const AuthContainerCSSL2 = "flex flex-col w-full bg-white text-black px-8 pt-8 text-lg mb-8"
export const AuthInputContainerCss = "flex flex-row w-full justify-between md-4"
export const AuthSingleLineInputCss = " mx-4 w-90"

export const AuthSubmitCss = "flex flex-row w-full mt-4 leading-6 h-9 bg-sky-500 justify-center text-white rounded "

export const AuthPages = { SignUp: "SignUp", MyProfile: "MyProfile", ForgotPassword: "ForgotPassword", Login: "Login" }

const AuthFrame = ({ AuthPage, To }) => {
    const { LoggedIn } = useContext(GlobalContext)
    const router = useRouter()
    useEffect(() => {
        //if LoggedIn and current page is AuthPages.Login, redirect to home page
        if (!LoggedIn || !(AuthPage === AuthPages.Login || AuthPage === AuthPages.SignUp)) return
        router.push(To)
    }, [LoggedIn])
    return <div className="flex flex-row items-start self-center justify-center w-full h-full mt-4 ">
        <div>
            {AuthPage === AuthPages.SignUp && <SignUp To={To} />}
            {AuthPage === AuthPages.MyProfile && <MyProfile />}
            {AuthPage === AuthPages.ForgotPassword && <ForgotPassword To={To} />}
            {AuthPage === AuthPages.Login && <Login To={To} />}
        </div>
    </div>
}
export default function AuthPopper({ AuthPage, To }) {
    return <AuthContextComponent>
        <AppFrame>
            <AuthFrame AuthPage={AuthPage} To={To} />
        </AppFrame>
    </AuthContextComponent>
}
export const getServerSideProps = async (context) => {
    return {
        props: {
            AuthPage: context.query.page ?? "",
            To: context.query.to ?? "/",
        }
    }
}