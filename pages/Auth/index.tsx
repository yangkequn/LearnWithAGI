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
import { AuthPages } from "./consts";

const AuthFrame = ({ AuthPage, To }: { AuthPage: string, To: string }) => {
    const { LoggedIn } = useContext(GlobalContext)
    const router = useRouter()
    useEffect(() => {
        //if LoggedIn and current page is AuthPages.Login, redirect to home page
        if (!LoggedIn || !(AuthPage === AuthPages.Login || AuthPage === AuthPages.SignUp)) return
        router.push(To)
    }, [LoggedIn])
    return <div className="flex flex-row items-start self-center justify-center w-full h-full mt-4 ">
        {AuthPage === AuthPages.SignUp && <SignUp To={To} />}
        {AuthPage === AuthPages.MyProfile && <MyProfile />}
        {AuthPage === AuthPages.ForgotPassword && <ForgotPassword To={To} />}
        {AuthPage === AuthPages.Login && <Login To={To} />}
    </div>
}
export default function AuthPopper({ AuthPage, To }: { AuthPage: string, To: string }) {
    return <AuthContextComponent>
        <AppFrame>
            <AuthFrame AuthPage={AuthPage} To={To} />
        </AppFrame>
    </AuthContextComponent>
}
export const getServerSideProps = async (context: any) => {
    return {
        props: {
            AuthPage: context.query.page ?? "",
            To: context.query.to ?? "/",
        }
    }
}