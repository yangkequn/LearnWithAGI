/* eslint-disable react-hooks/exhaustive-deps */
import React, { use, useContext, useEffect, useState } from "react";
import MyProfile from "./myProfile";
import AppFrame from "../../component/appFrame"
import { GlobalContext } from "../_app";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Order from "./Order";
import Purchase from "./Purchase";
import { Jwt } from "@/component/jwt";

const UserCenterPages = { MyProfile: "MyProfile", Order: "Order", Purchase: "Purchase", None: "" }
const UserCenter = () => {
    const { Params, LoggedIn, setMenuL2 } = useContext(GlobalContext)
    let { page, To } = Params
    const router = useRouter()
    const MenuL2 = (Page) => <div className="flex flex-row justify-center items-center w-full h-full  ">
        <div className="flex flex-row max-w-lg gap-4 text-base self-center">
            <Link href={`/UserCenter?page=MyProfile`} className={`self-center rounded-lg px-2 py-1 hover:bg-amber-200 ${Page === "MyProfile" && "bg-amber-200"}`}
                onClick={(e) => {
                    router.push("/UserCenter?page=MyProfile")
                }} >
                我的资料
            </Link>

            <Link href={`/UserCenter?page=Order`} className={`self-center rounded-lg px-2 py-1 hover:bg-amber-200 ${Page === "Order" && "bg-amber-200"}`}
                onClick={(e) => {
                    router.push("/UserCenter?page=Order")
                }} >
                我的订单
            </Link>

            <Link href={`/UserCenter?page=Purchase`} className={`self-center rounded-lg px-2 py-1 hover:bg-amber-200 ${Page === "Purchase" && "bg-amber-200"}`}
                onClick={(e) => {
                    router.push("/UserCenter?page=Purchase")
                }}>
                服务与开通
            </Link>
            <button className="hover:bg-yellow-500 w-24 rounded " onClick={e => {
                Jwt.Clear();
                router.push(To ?? "/");
            }}>退出 / 登出</button>
        </div>
    </div>
    useEffect(() => {
        setMenuL2(MenuL2(page))
        let validPage = page === UserCenterPages.MyProfile || page === UserCenterPages.Order || page === UserCenterPages.Purchase || page === UserCenterPages.None
        if (LoggedIn && !!page && !validPage) return router.push(To ?? "/")
    }, [LoggedIn, page])
    return <div className="flex flex-col items-start self-center justify-center w-full h-full mt-4 ">
        {LoggedIn && (page === UserCenterPages.MyProfile || page === UserCenterPages.MyProfile) && <MyProfile />}
        {LoggedIn && page === UserCenterPages.Order && <Order />}
        {LoggedIn && page === UserCenterPages.Purchase && <Purchase />}
    </div>
}
export default function UserCenterPage({ Page, To }) {
    return <AppFrame>
        <UserCenter />
    </AppFrame>
}