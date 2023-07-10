/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, } from "react";
import { Alert, Button, Collapse, Container, TextField, } from "@mui/material";
import { AuthContainerCSS, AuthContainerCSSL2, AuthCss, AuthPages, AuthSingleLineInputCss } from "./index";
import CountrySelect from "./countrySelect";
import { AuthContext } from "./AuthContext";
import Box from '@mui/material/Box';
import { API } from "../../component/api";
import { Jwt } from "../../component/jwt";
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin } from '@react-oauth/google';
import "tailwindcss/tailwind.css"

export default function Login({ SetOpenAlert, openAlert }) {
    const ToOneLanguage = (l) => {
        const MenuText = {
            Title: ["Login", "账号登录"][l],
            CountryCodeTitle: ["US +", "美国 +"][l],
            AccountTitle: ["Type Account Here", "手机号/账号"][l],
            ForeignPhoneMode: ["Foreign Phone login", "海外手机号登录"][l],
            ForgotPassword: ["Forgot password", "忘记密码?"][l],
            MailAccountLogin: ["Login with Phone or email", "邮箱帐号登录"][l],
            CountryCode: [1, 86][l],
            PhoneNumberTitle: ["phone Number", "请输入手机号"][l],
            AccountPasswordError: ["Error account or password ", "账号或密码错误"][l],
            PhoneBadFormat: ["phone number invalid", "输入有效的手机号码"],
            PasswordTitle: ["Password", "登录密码"][l],
            PasswordBadFormat: ["password too short", "密码太短"][l],
            LoginTitle: ["Login", "登录"][l],
            WithoutAnAccount: ["Don't have an account yet?", "没有账号？"][l],
            Signup: ["Sign up", "注册"][l],
            Footer: ["Together, life is bigger", "在一起，生命更放大"][l]
        }
        return MenuText
    }
    const info = ToOneLanguage(1)

    const {
        AuthBoxPage, SetAuthPage,
        countryCode, setCountryCode, countryCodeError,
        phone, setPhone, phoneError,
        account, setAccount, accountError, setAccountError,
        password, setPassword, passwordError,
        foreignPhone, setForeignPhone,
        checkCountryCode, checkPhone, checkAccount, CheckPassword
    } = useContext(AuthContext)

    useEffect(() => { !!countryCode && checkCountryCode() }, [countryCode])
    useEffect(() => { !!phone && checkPhone() }, [phone])
    useEffect(() => { !!account && checkAccount(false) }, [account])
    useEffect(() => { !!password && CheckPassword() }, [password])

    const login = (e) => {
        let ok = foreignPhone && checkCountryCode() && checkPhone() && CheckPassword()
        if (!ok) ok = !foreignPhone && checkAccount(false) && CheckPassword()
        if (!ok) return
        API("userSignIn", { Account: account || phone, Password: password, CountryCode: countryCode, Time: new Date().getTime() }).then((data) => {
            if (data === null || data === undefined) return
            if ("error" in data) {
                const error = data["error"]
                if (error === "account or password error") setAccountError(info.AccountPasswordError)
                SetOpenAlert(10000)
                Jwt.SaveOrClear(data)
            } else {
                Jwt.SaveOrClear(data)
            }
        })
    }

    return <div className={AuthContainerCSS}>
        <GoogleOAuthProvider clientId="129830787781-sd5edo6nis08ohho627s3v2vk405795r.apps.googleusercontent.com">
            <div className={AuthContainerCSSL2}>

                <Box sx={{ m: "0 0 0 1em" }}><h2> {info["Title"]} </h2></Box>
                <Collapse in={openAlert}>
                    <Alert severity="info"  >账号或密码错误</Alert>
                </Collapse>


                <div className="w-full flex flex-col">
                    <div className="flex flex-row self-start w-full " style={{ display: foreignPhone ? "flex" : "none" }}>
                        {/*选择国家*/}
                        <CountrySelect width={"150px"} disableCloseOnSelect defaultValue={"CN"} > </CountrySelect>
                        {/*填写手机号码*/}
                        <TextField id="signUp-phone" label={phoneError || info["PhoneNumberTitle"]} size="small"
                            variant="standard"
                            error={!!phoneError} onChange={e => setPhone(e.target.value)}
                            style={{ width: "70%" }} />

                    </div>


                    {!foreignPhone && <TextField id="login-phone" label={accountError || info["AccountTitle"]} size="small"
                        variant="standard" className={AuthSingleLineInputCss}
                        error={!!accountError} onChange={e => setAccount(e.target.value)} />}

                    {/*密码框*/}
                    <TextField id="login-password" label={passwordError || info["PasswordTitle"]} size="small" type={"password"}
                        variant="standard" className={AuthSingleLineInputCss}
                        error={!!passwordError} onChange={e => setPassword(e.target.value)} />

                    <Container className="flex flex-row self-start w-full justify-between" sx={{ color: "#25a", margin: "1.3em 0 1.0em 0" }}
                        key={"user_foreign_phone"}>
                        <Button onClick={e => {
                            let ToBeForeignMode = !foreignPhone
                            setCountryCode(ToBeForeignMode ? 1 : 86);
                            if (ToBeForeignMode) setAccount("")
                            else setPhone("")
                            setForeignPhone(!foreignPhone);
                        }}>
                            {!foreignPhone ? info.ForeignPhoneMode : info.MailAccountLogin}
                        </Button>


                        <div onClick={e => SetAuthPage(AuthPages.ForgotPassword)} key={"user_forgot_password"}
                            style={{ color: "#8590a6" }}>
                            {info.ForgotPassword}
                        </div>
                    </Container>
                    <div className="w-full flex flex-row justify-between mb-4">
                        <button key={"login-button"} className="flex leading-6 text-sm w-40 h-9 bg-sky-500 justify-center text-white rounded items-center mx-4" onClick={e => login(e)}>
                            {info.LoginTitle}
                        </button>

                        <div key="SignUP" className={"flex flex-row items-center mx-4 w-90 w-fit"}  >
                            <div>{info.WithoutAnAccount}</div>
                            <button className="flex leading-6 text-sm w-32 h-9 bg-sky-500 justify-center text-white rounded items-center mx-4" onClick={e => SetAuthPage(AuthPages.SignUp)}>{info.Signup}</button>
                        </div>
                    </div>
                </div>

                <Box sx={{ width: "100%" }}>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            API("userSignInGoogle", credentialResponse).then((data) => {
                                if (data === null || data === undefined) return
                                if ("error" in data) {
                                    //{credential,clientId,select_by}
                                    const error = data["error"]
                                    if (error === "account or password error") setAccountError(info.AccountPasswordError)
                                    SetOpenAlert(10000)
                                    Jwt.SaveOrClear(data)
                                } else {
                                    Jwt.SaveOrClear(data)
                                    SetAuthPage(AuthPages.None)
                                }
                            })
                        }}
                        onError={() => {
                        }}

                        useOneTap
                    />
                </Box>

                {/* insert Google login button here */}





            </div>
        </GoogleOAuthProvider>
        {/* <div className={"footer"}>{info.Footer}</div> */}
    </div>
}
