/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { AuthContainerCSS, AuthContainerCSSL2, AuthSingleLineInputCss, AuthCss, AuthInputContainerCss, AuthPages, AuthSubmitCss } from "./index";
import { AuthContext } from "./AuthContext";
import CountrySelect from "./countrySelect";
import { GlobalContext } from "../_app"
import { Box, Button, TextField } from "@mui/material";
import { API } from "../../component/api";
import "tailwindcss/tailwind.css"

const ToOneLanguage = (language_ind) => {
    const infoMultiLanguages = {
        Title: ["Reset Password", "找回密码"],
        Annotation: ["Check code will sent to e-mailbox or phone", "验证码将会发送至邮箱或手机"],
        CountryCodeTitle: ["US +", "美国 +"],
        AccountTitle: ["Type Account Here", "输入手机号/邮箱"],
        ForeignPhoneMode: ["Foreign Phone Reset Password", "海外手机号找回"],
        ForgotPassword: ["Forgot password", "忘记密码?"],
        MailAccountLogin: ["Login with Phone or email", "邮箱帐号登录"],
        CountryCode: [1, 86],
        PhoneNumberTitle: ["phone Number", "请输入手机号"],
        AccountPasswordError: ["Error account or password ", "账号或密码错误"],
        PhoneBadFormat: ["phone number invalid", "输入有效的手机号码"],
        PasswordTitle: ["Password", "请输人新的密码"],
        VerifyCodeTitle: ["SMS verification code", "输入校验码"],
        PasswordBadFormat: ["password too short", "密码太短"],
        ResetTitle: ["Reset password", "重置密码"],
        WithoutAnAccount: ["Don't have an account yet?", "没有账号？"],
        Signup: ["Sign up", "注册"],
        Footer: ["Together, life is bigger", " "]
    }
    let ret = {}
    Object.keys(infoMultiLanguages).map((k, i) => ret[k] = infoMultiLanguages[k][language_ind])
    return ret
}

export default function ForgotPassword() {

    const info = ToOneLanguage(1)
    const {
        AuthBoxPage, SetAuthPage,
        CountryCode, setCountryCode, countryCodeError,
        phone, setPhone, phoneError,
        account, setAccount, accountError,
        password, setPassword, passwordError,
        foreignPhone, setForeignPhone,
        SMSCode, setSMSCode, SMSCodeError, SMSButtonText, SMSButtonDisabled,
        checkAccount, CheckPassword, checkCountryCode, checkPhone, checkSMSCode, SendSMSCode
    } = useContext(AuthContext);

    useEffect(() => { !!account && checkAccount() }, [account])
    useEffect(() => { !!password && CheckPassword() }, [password])

    useEffect(() => { !!CountryCode && checkCountryCode() }, [CountryCode])
    useEffect(() => { !!phone && checkPhone() }, [phone])
    useEffect(() => { !!SMSCode && checkSMSCode() }, [SMSCode])

    const reset = (e) => {
        let ok = foreignPhone && checkCountryCode() && checkPhone() && CheckPassword()
        if (!ok) ok = !foreignPhone && checkAccount() && CheckPassword()
        if (!ok) return
        checkSMSCode()
        API("userResetPassword", { CountryCode, phone, SMSCode, password }).then((ret) => {
            //
        })


    }
    return <div className={AuthContainerCSS} >
        <div className={AuthContainerCSSL2}>
            <Box sx={{ margin: "0 0 0 1em" }}>
                <div className="flex flex-row self-start w-full" ><h2> {info.Title} </h2></div>
                <div className="flex flex-row self-start w-full text-gray-600 mb-4 text-sm">{info.Annotation}</div>
            </Box>


            {!foreignPhone ?
                <TextField key="forgotPassword-phone" label={info.AccountTitle} size="small" className={AuthSingleLineInputCss}
                    variant="standard" helperText={accountError}
                    error={!!accountError} onChange={e => setAccount(e.target.value)} />
                :
                <div className="flex flex-row self-start w-full  mx-4 w-90" >
                    <CountrySelect key={`forgotPassword_CountrySelect_${foreignPhone}`} width={"250px"} disableCloseOnSelect defaultValue={'CN'}> </CountrySelect>

                    {/*填写手机号码*/}
                    <TextField key="forgotPassword-phone" label={info["PhoneNumberTitle"]} size="small"
                        helperText={phoneError}
                        variant="standard" error={!!phoneError} onChange={e => setPhone(e.target.value)}
                        style={{ width: "70%" }} />
                </div>}


            {/*密码框*/}
            <TextField key="forgotPassword-password" label={info["PasswordTitle"]} size="small" type={"password"}
                variant="standard" helperText={passwordError} className={AuthSingleLineInputCss}
                error={!!passwordError} onChange={e => setPassword(e.target.value)} />


            {/*手机校验码*/}
            <div className={AuthInputContainerCss} key={"input-SMS-code"}>
                <TextField key="forgotPassword-SMS" type="text" label={info.VerifyCodeTitle}
                    size="small" helperText={SMSCodeError} variant="standard" className={AuthSingleLineInputCss}
                    onChange={e => setSMSCode(e.target.value)} error={!!SMSCodeError}
                    fullWidth={true}></TextField>
                <Button onClick={e => SendSMSCode(() => {
                    if (!foreignPhone) return checkAccount()
                    if (foreignPhone) return checkCountryCode() && checkPhone()
                })} style={{ width: 200 }} disabled={SMSButtonDisabled}>{SMSButtonText} </Button>
            </div>

            <div key="user_foreign_phone" className="flex flex-row self-start w-full mx-2">
                <Button onClick={e => {
                    setForeignPhone(!foreignPhone);
                    setCountryCode(foreignPhone ? 1 : 86);
                    if (foreignPhone) setAccount("")
                    else setPhone("")
                }}>
                    {!foreignPhone ? info.ForeignPhoneMode : info.MailAccountLogin}
                </Button>
            </div>

            <div className="w-full flex flex-row justify-between self-center items-center mb-4">

                <button key={"login-button"} className="flex flex-row w-40 leading-6 h-9 bg-sky-500 justify-center text-white rounded mx-4 w-90 items-center"
                    onClick={e => reset(e)}>{info.ResetTitle} </button>

                <div className="flex flex-row self-center items-center" >
                    <div className="flex flex-row self-center items-center">{info.WithoutAnAccount}</div>
                    <button className="flex flex-row w-40 leading-6 h-9 bg-sky-500 justify-center text-white rounded mx-4 items-center" onClick={e => SetAuthPage(AuthPages.SignUp)}>{info.Signup}</button>
                </div>
            </div>
        </div>

        <div className="footer">{info.Footer}</div>
    </div>
}