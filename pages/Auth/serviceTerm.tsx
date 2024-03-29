/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, } from "react";
// import "tailwindcss/tailwind.css"
export default function ServiceTerm() {
    return <div className=" max-w-lg flex flex-col mt-3 m-2 overflow-x-scroll">
        <h1 className=" text-xl mb-4">用户注册协议</h1>
        <p>欢迎您使用我们的学习网站。在您注册成为用户前，请仔细阅读以下用户注册协议（以下简称“协议”）。</p>
        <ol>
            <li><strong>接受条款</strong>：您确认，在您完成注册程序或以其他我们允许的方式实际使用我们的服务前，您已详细阅读了本协议所有内容，一旦您使用我们的服务，您的使用行为将被视为对本协议全部内容的认可。</li>
            <li><strong>注册资格</strong>：您确认，在您完成注册程序或以其他方式使用我们的服务时，您应是具备完全民事行为能力的自然人、法人或其他组织。否则，您还应停止注册或停止使用我们的服务。</li>
            <li><strong>用户信息</strong>：在注册过程中，您应当按照法律法规要求，按相应页面的提示准确提供您的信息（如身份证明、联系方式等），以便我们为您提供服务。您了解并同意，您有义务保持您提供信息的真实性及有效性。</li>
            <li><strong>账户安全</strong>：您应当对您的账户信息负责，只有您或您的授权人可以使用您的账户。如果您泄露了您的账户密码或账户信息，您可能会丧失您的法定权益，对此可能产生的任何损失，我们不承担责任。</li>
            <li><strong>服务内容</strong>：本网站通过问答的形势提供学习内容，课程内容仅供参考，我们不保证课程内容的准确性和完整性。对于您使用课程内容产生的任何后果，我们不承担责任。</li>
            <li><strong>知识产权</strong>：我们的服务包含的所有智力财产权，除另有声明或法律规定外，均归我们所有。除非我们书面同意，您使用我们的服务应当在我们的授权范围内。</li>
            <li><strong>隐私保护</strong>：保护用户隐私是我们的重要政策，我们将依据我们的隐私政策来使用和保护您的隐私信息。</li>
            <li><strong>法律适用</strong>：本协议的签订、执行、解释、争议的解决均适用中华人民共和国的法律。</li>
        </ol>
        <p>如果您对协议有任何疑问，可以向我们的客户服务部门咨询。</p>
    </div>

}