import React, { useContext, useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import { API } from "@/component/api";
import { GlobalContext } from "../_app";
function Order({ }) {
  const [myOrders, setMyOrders] = useState([])
  const {quota} = useContext(GlobalContext)
  useEffect(() => {
    API("OrderMine").then((data) => {
      if (!data || data.length == 0) return
      setMyOrders(data)
    })
  }, [])
  const OrderDue = (dateSec) => {
    if (!dateSec) return "-"
    var due = new Date(dateSec * 1000)
    //return format "yyyy-MM-dd hh:mm"
    return due.toISOString().replace("T", " ").substring(0, 16)
  }
  const Activated = (dateSec) => Date.now() > new Date(!dateSec ? 0 : dateSec * 1000) ? "🔴" : "🟢"
  return <div key={`MyOrder`} className="flex flex-col justify-center h-full items-center font-sans w-full" >

    <div key="现有订单" className="  flex-row justify-center items-center w-full h-full  min-w-[700px] text-base max-w-3xl ">
      <div key="已经开通的订单" >
        <div className=" flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-3xl  bg-blue-50 rounded-xl px-2 py-1">已经开通的订单</div>
        <div className="grid grid-cols-[24%_22%_13%_18%_9%_12%] leading-10">
          <div className=""> 订单号 </div>      <div className=""> 服务等级 </div>      <div className=""> 价格 / 元 </div>        <div className=""> 到期时间  </div><div className=""> 已激活 </div><div className=""> 支付 </div>
        </div>
        {myOrders.map((order) => {
          return <div key={order.OrderNumber} className="grid grid-cols-[24%_22%_13%_18%_9%_12%] leading-10">
            <div className=""> {order.TradeNumber} </div>
            <div className=""> {order.name} </div>
            <div className=""> {order.money} </div>

            {/* format "yyyy-MM-dd hh:mm:ss" */}
            <div className=""> {OrderDue(order.ServiceEndAt)} </div>
            <div className={`${Activated(order.ServiceEndAt) === "🟢" && "animate-bounce"} `}> {Activated(order.ServiceEndAt)} </div>
            <div className=""> {order.Paid ? "已支付" : "未支付"} </div>
          </div>
        })}
        {
          myOrders.length == 0 && <div className="flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-xs ">
            没有订单
          </div>
        }
      </div>

      <div key="今天剩余服务明细" className=" my-8       " >
        <div className=" flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-3xl  bg-yellow-50 rounded-xl px-2 py-1">今日所有订单，总计剩余可用次数</div>
        {
          //今日剩余chatGPT4、chatGPT3.5、剩余课程的次数
          myOrders.length > 0 && <div className="flex flex-col justify-center items-center w-full h-full  min-w-[600px] text-base max-w-xl ">
            <div key="今日所有订单，总计剩余可用次数" className="grid grid-cols-[25%_25%_25%_25%] leading-10 w-full">
              <div className="">   </div>
              <div className=""> ChatGPT3.5 </div>
              <div className=""> ChatGPT4 </div>
              <div className=""> 剩余课程 </div>
            </div>
            <div className="grid grid-cols-[25%_25%_25%_25%] leading-10  w-full">
              <div className="">  </div>
              <div className=""> {quota.AllowedDayGPT35} </div>
              <div className=""> {quota.AllowedDayGPT4} </div>
              <div className=""> {quota.AllowedDaySkill} </div>
            </div>
          </div>
        }
      </div>
    </div>


  </div >
}
export default Order