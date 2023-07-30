import React, { Fragment, useContext, useEffect, useState } from "react";
import { Alert, Collapse, Radio, RadioGroup, Step, StepButton, Stepper } from "@mui/material";
import { GlobalContext } from "../_app";
import { API } from "@/component/api";
import { useRouter, usePathname } from 'next/navigation';

function Purchase() {
  const router = useRouter()
  const [purchaseStep, setPurchaseStep] = React.useState(0);
  const [stepCompleted, setStepCompleted] = React.useState({ 0: false, 1: false, 2: false });
  const [myOrderService, setMyOrderService] = useState(null)
  const { openAlert, setOpenAlert } = useContext(GlobalContext)

  const [payType, setPayType] = useState("alipay")
  const onRadioChecked = (service) => {
    setMyOrderService(service)
  }
  //{ Describe: "全部服务30天，包括ChatGPT4", Price: 35, Duration: "1月", left: "1月" }
  const [services, setServices] = useState([])
  useEffect(() => {
    API("OrderPlanes").then((data) => {
      setServices(data)
    })
  }, [])

  const [QrCode, setQrCode] = useState("")
  const [PayUrl, setPayUrl] = useState("")
  const [TradeNumber, setTradeNumber] = useState("")
  useEffect(() => {
    if (!TradeNumber) return
    var timer = setInterval(() => API("OrderCheckState", { TradeNumber: TradeNumber }).then((data) => {
      if (data?.Paid !== true) return
      //stop the timer
      clearInterval(timer)
      setStepCompleted({ ...stepCompleted, 2: true })
      //转到订单页面
      setOpenAlert("支付成功，正在跳转到订单页面")
      setTimeout(() => router.push("/UserCenter?page=Order"), 2000)

    }), 5000)
  }, [TradeNumber])
  const IsMobileDevice = () => {
    //detect if it is mobile device or not, by web browser 's user agent
    if (typeof window === "undefined") return false
    var ua = navigator.userAgent.toLowerCase();
    var isMobile = ua.indexOf("mobile") > -1;
    if (isMobile) return true
    var isPad = ua.indexOf("ipad") > -1;
    if (isPad) return true
    var isIphone = ua.indexOf("iphone") > -1;
    if (isIphone) return true
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) return true
    return false
  }
  return <div key={`MyOrder`} className="flex flex-col justify-start h-full items-center font-sans w-full" >

    <Collapse in={!!openAlert} className="flex w-full justify-center text-lg items-center" >
      <Alert severity="info" className=" self-center" >{openAlert}</Alert>
    </Collapse>
    <Stepper nonLinear activeStep={purchaseStep} sx={{ width: "600px", mt: 2 }} >
      {['选择服务', '确认订单', '支付订单', '查看订单'].map((label, index) => (
        <Step key={label} completed={stepCompleted[index]}>
          <StepButton color="inherit" onClick={e => setPurchaseStep(index)}>
            {label}
          </StepButton>
        </Step>
      ))}
    </Stepper>

    {purchaseStep === 0 && <div key="套餐种类" className="  flex-col justify-start items-center w-full h-full  min-w-[600px] text-base max-w-xl mt-4  ">
      <div className="grid grid-cols-[8%_16%_52%_12%_12%] leading-10 ">
        <div className=""> </div>
        <div className=""> 等级 </div>
        <div className=""> 服务内容 </div>
        <div className=""> 价格 </div>
        <div className=""> 时长 </div>
      </div>

      {services?.length > 0 && services.map((service, index) => {
        return < div key={`serive-${service}=${index}`} className="grid grid-cols-[8%_16%__52%_12%_12%] leading-10 ">
          <div className=""> <Radio value={service.Name} checked={myOrderService?.Name == service.Name} onChange={e => onRadioChecked(service)} /> </div>
          <div className="">{service.Name}</div>
          <div className="">{service.Describe}</div>
          <div className=""> {service.Price + "元"} </div>
          <div className=""> {service.DurationDay}天 </div>
        </div>
      })}

      {/* //for selected service, show the detail */}
      {<div className="flex flex-col justify-center items-center w-full   min-w-[600px] text-base max-w-xl mt-4">
        {/* 订单详情说明 */}
        <div key="订单详情说明" className="flex flex-row justify-center items-center w-full h-full  min-w-[600px] text-base max-w-xl  bg-blue-50 rounded-xl px-2 py-1">
          {myOrderService?.Name??""} 每日可用限额说明
        </div>
        <div key="每日剩余可用次数" className="grid grid-cols-[25%_25%_25%_25%] leading-10 w-full">
          <div className="">   </div>
          <div className=""> ChatGPT3.5 </div>
          <div className=""> ChatGPT4 </div>
          <div className=""> 新建课程 </div>
        </div>
        <div className="grid grid-cols-[25%_25%_25%_25%] leading-10  w-full">
          <div className="">  </div>
          <div className=""> {myOrderService?.AllowedDayGPT35 ?? 0} </div>
          <div className=""> {myOrderService?.AllowedDayGPT4 ?? 0} </div>
          <div className=""> {myOrderService?.AllowedDaySkill ?? 0} </div>
        </div>
      </div>
      }

      {/* 下一步按钮 */}
      <div className="flex flex-row  w-[500px] justify-end mt-4 gap-4 pl-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e => {
          if (!myOrderService) return setOpenAlert("请选择服务")
          setStepCompleted({ ...stepCompleted, 0: true })
          setPurchaseStep(1)
        }}>下一步</button>
      </div>
    </div>}

    {purchaseStep === 1 && stepCompleted[0] && <div className="flex flex-col justify-start items-center w-full  min-w-[600px] text-base max-w-xs mt-8  ">

      <div className="flex flex-row  w-[500px] justify-start mt-6"> 您正在购买服务： </div>

      <div className="  w-[500px]  grid grid-cols-[15%_55%_15%_15%] leading-10 mt-4 gap-4 pl-8">
        <div className=""> 名称 </div>
        <div className=""> 服务内容 </div>
        <div className=""> 价格 </div>
        <div className=""> 时长</div>

        <div className="">{myOrderService.Name}</div>
        <div className="">{myOrderService.Describe}</div>
        <div className=""> {myOrderService.Price + "元"} </div>
        <div className=""> {myOrderService.DurationDay + "天"} </div>
      </div>



      <div key="pay-type" className="flex-row  w-[500px]  justify-start items-center h-full max-w-lg gap-4 text-base self-center mt-8 ">
        请选择支付方式：
      </div>

      <div className="flex flex-row  w-[500px] justify-start mt-4 gap-4 pl-8">
        <div className=""> <Radio value={"alipay"} checked={payType == "alipay"} onChange={e => setPayType("alipay")} /> 支付宝 </div>
        <div className=""> <Radio value={"wxpay"} checked={payType == "wxpay"} onChange={e => setPayType("wxpay")} /> 微信支付 </div>
      </div>

      {/* 下一步按钮 */}
      <div className="flex flex-row  w-[500px] justify-end mt-4 gap-4 pl-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={e => {

          var tmout = setTimeout(() => { setOpenAlert("未能创建订单，请稍后再试") }, 5000)
          API("CreateOrder7Pay", { Name: myOrderService.Name, PayType: payType }).then((order) => {
            if (!order?.PayUrl || !order?.QrCode) return setOpenAlert("未能创建订单，请稍后再试")
            //cancel the timeout
            clearTimeout(tmout)
            setStepCompleted({ ...stepCompleted, 1: true })
            setPurchaseStep(2)
            setPayUrl(order.PayUrl)
            setQrCode(order.QrCode)
            setTradeNumber(order.TradeNumber)
          })
        }}>下一步</button>
      </div>
    </div>
    }


    {purchaseStep === 2 && stepCompleted[1] && <div className="flex flex-col justify-start items-center w-full  min-w-[600px] text-base max-w-xs mt-8  ">
      {/* 微信或 支付宝 扫描二维码 支付 */}
      {<div className="flex flex-col justify-start items-center w-full  min-w-[600px] text-base max-w-xs my-8  ">

        <div className="flex flex-row  w-[500px] justify-start "> {payType == "alipay" ? "支付宝" : "微信"} 扫描下方二维码进行支付 </div>

        <div className="flex flex-row  w-[400px] justify-start mt-2"> <img src={QrCode} /> </div>


        {/* 使用跳转网页支付 */}
        {IsMobileDevice() && <div className="flex flex-row  w-[500px] justify-start flex-nowrap gap-4 mt-4">
          <div>或者</div>
          {/* open link in new page, to pay the bill in 3rd pary site */}
          <a href={PayUrl} target="_blank" className="flex flex-row   justify-start items-center h-full max-w-lg gap-4 text-base self-center mt-8 bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "> 或使用{payType === "alipay" ? "支付宝" : "微信"} APP支付 </a>
        </div>
        }

      </div>}
    </div>}

  </div>
}
export default Purchase