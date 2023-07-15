/* eslint-disable react-hooks/exhaustive-deps */
import React, { createRef, useContext, useEffect, useState, } from "react";
import Alert from "@mui/material/Alert";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import CountrySelect, { Countries, CountryCodes, CountryToFlag } from "./countrySelect";
import { AuthContext } from "./AuthContext";
import { AuthPages, AuthContainerCSS, AuthContainerCSSL2, AuthSingleLineInputCss } from "./consts";
import { Jwt } from "../../component/jwt";
import { API } from "../../component/api";
import { useRouter } from "next/navigation";
import ServiceTerm from "./serviceTerm";
import { create } from "domain";

export default function SignUp({ To }) {
    const [aggreeToTerm, setAgreeToTerm] = useState(false)
    const [browseTerm, setBrowseTerm] = useState(false)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [alert, setAlert] = useState("")
    const router = useRouter()

    const ToOneLanguage = language_ind => {
        const info_languages = {
            Title: ["Sign up", "注册"],
            CountryCodeTitle: ["US +1", "中国 +86"],
            CountryCode: [1, 86],
            PhoneNumberTitle: ["phone Number", "常用手机号"],
            PhoneError: ["phone number already registered", "该手机号已被注册"],
            PhoneBadFormat: ["phone number invalid", "输入有效的手机号码"],
            PasswordTitle: ["Password", "密码"],
            PasswordTooShort: ["password too weak, change to a stronger one", "密码太短,应为8-32位"],
            VerifyCodeTitle: ["SMS verification code", "输入短信验证码"],
            SMSCodeError: ["SMS verification code Error", "短信验证码错误"],
            TermAgreeTitle: ["I agree to the ", "同意"],
            TermLinkTitle: ["Terms and Conditions", "注册条款"],
            RegisterTitle: ["Register", "注册"],
            HaveAccountAlready: ["Already have an account?", "已经有账号了？"],
            Login: ["Login", "登录"],
            //Footer: ["Together, life is bigger", "在一起，生命更放大"]
            Footer: ["Together, life is bigger", ""]
        }
        let ret = {}
        Object.keys(info_languages).map((k, i) => ret[k] = info_languages[k][language_ind])
        return ret
    }

    const info = ToOneLanguage(1)
    const {
        // nickname: [nickname, setNickname, nicknameError ],
        account, setAccount, accountError, setAccountError,
        countryCode, setCountryCode, countryCodeError,
        phone, setPhone, phoneError, setPhoneError,
        password, setPassword, passwordError, setPasswordError,
        SMSCode, setSMSCode, SMSCodeError, setSMSCodeError, SMSButtonText, SMSButtonDisabled,
        checkSMSCode, checkAccount, CheckPassword, checkCountryCode, checkPhone, SendSMSCode
    } = useContext(AuthContext)


    useEffect(() => { !!account && checkAccount(true) }, [account])
    useEffect(() => { !!password && CheckPassword() }, [password])
    useEffect(() => { !!countryCode && checkCountryCode() }, [countryCode])
    useEffect(() => { !!phone && checkPhone() }, [phone])
    useEffect(() => { !!SMSCode && checkSMSCode() }, [SMSCode])

    const signUp = e => {
        let pass = checkAccount(true) && CheckPassword() && checkCountryCode() && checkPhone()
        if (!pass) return
        const signUpCallBack = (ret) => {
            if (!ret || !ret.data) return
            const error = ret.data["error"]
            if (error === "phone_registered") setPhoneError("该手机号已被注册")
            else if (error === "account_registered") setAccountError("该手机号已被注册")
            else if (error === "SMSCode") setSMSCodeError("短信验证码错误")
            else if (!error) {
                Jwt.Save(ret.data)
                router.push(To)
            }
        }
        var data = { Account: account.toLowerCase(), Password: password, CountryCode: countryCode, phone, SMSCode: parseInt(SMSCode) }
        API("userSignUp", data).then(signUpCallBack)
    }
    return <div id="signUpBox" key={"signUpBox"} className={AuthContainerCSS} >
        <div className={AuthContainerCSSL2}>
            <div className="ml-4" ><h2> {info["Title"]} </h2></div>
            <Stack sx={{ width: '100%' }} spacing={2}>
                {!!alert && <Alert severity="warning">{alert}</Alert>}
            </Stack>


            <TextField id="signUp-nickname" type="text" className={AuthSingleLineInputCss} label={accountError || "账户名"}
                onChange={e => setAccount(e.target.value)} error={!!accountError} size={"small"} variant="standard" autoFocus={true} />


            <TextField id="signUp-password" type="password" className={AuthSingleLineInputCss} label={info.PasswordTitle} size="small"
                variant="standard" error={!!passwordError} helperText={passwordError} onChange={e => setPassword(e.target.value)} />


            <div className={"flex flex-row gap-8 mx-4 w-90 mt-4"}>                 {/*选择国家*/}
                {/* <CountrySelect key={"signUp-CountrySelect"} width={200} setCountryCode={setCountryCode} disableCloseOnSelect defaultValue={'CN'} countryCodeError={countryCodeError} > </CountrySelect> */}
                <Autocomplete key={"signUp-CountrySelect"} style={{ width: 200, border: "0px", }} options={CountryCodes} defaultValue={"CN"} autoComplete={true} autoHighlight={true}
                    getOptionLabel={option => {
                        let country = Countries[option]
                        return `${CountryToFlag(country.code)} ${country.phone} ${country.label}`
                    }}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            let country = Countries[newValue]
                            setCountryCode(country.phone)
                        }
                    }}
                    renderInput={params => <TextField {...params} label={countryCodeError || "选择所在国家"} variant="standard"
                        size="small"
                        inputProps={{ ...params.inputProps, autoComplete: 'new-password', }}
                        error={!!countryCodeError} />
                    }
                />
                {/*填写手机号码*/}
                <TextField id="signUp-phone" label={phoneError || info["PhoneNumberTitle"]} size="small"
                    variant="standard"
                    error={!!phoneError} onChange={e => setPhone(e.target.value)}
                    style={{ width: "70%" }} />
            </div>

            {/*手机校验码*/}
            <div className="flex flex-row mx-4 w-90 mb-4" key={"input-SMS-code"}>
                <TextField id="signUp-SMS" type="number" label={info.VerifyCodeTitle} size="small" variant="standard"
                    helperText={SMSCodeError} onChange={e => setSMSCode(e.target.value)} error={!!SMSCodeError}
                    fullWidth={true}></TextField>
                <Button onClick={e => SendSMSCode(() => {
                    return checkCountryCode() && checkPhone()
                })}
                    style={{ width: 200 }} disabled={SMSButtonDisabled}>
                    {SMSButtonText}
                </Button>
            </div>

            {/* click and popup a term dialog */}
            <Popover id={"ServiceTermPopper"} open={!!anchorEl} anchorEl={anchorEl} onClose={e => { setAnchorEl(null) }}>
                <ServiceTerm />
            </Popover>

            <div className="w-full flex flex-row justify-between mb-4 self-center">
                <div className="gap-2 flex flex-row items-center">

                    <div id="ServiceTerm" key={"agree-to-term"} className={"flex  flex-row text-sm  w-90 mx-2 bg-white gap-1"}>
                        <Checkbox onClick={e => setAgreeToTerm(!aggreeToTerm)} ></Checkbox>
                        <div key="agree" className="text-small items-center self-center">{info.TermAgreeTitle}</div>

                        <div key="agree-term" className="self-center h-full flex"
                            onClick={(event) => setAnchorEl(!!anchorEl ? null : document.getElementById("signUpBox"))}>
                            <b className="text-small items-center self-center">{info.TermLinkTitle}</b>
                        </div>

                    </div>
                    <div key="signUpButton" className="h-full self-center flex">
                        <button key={"sign-up-button"} className=" text-sm w-40 bg-sky-500 justify-center text-white rounded items-center mx-4" onClick={e => {
                            if (!aggreeToTerm) {
                                setAlert("您必须先同意注册条款")
                                setTimeout(() => setAlert(""), 5000)
                            }
                            signUp(e)
                        }}>
                            {info.RegisterTitle}
                        </button>
                    </div>
                </div>

                <div className="flex flex-row items-center mx-4  w-fit">
                    <div className="text-sm">{info.HaveAccountAlready}</div>
                    <button className="flex leading-6 text-sm w-20 h-9 bg-sky-500 justify-center text-white rounded items-center mx-4" onClick={e =>
                        router.push(`/Auth?page=${AuthPages.Login}&to=${To}`)}>{info.Login}</button>
                </div>
            </div>
        </div>

        <div className={"footer"}>{info.Footer}</div>
    </div >
}

