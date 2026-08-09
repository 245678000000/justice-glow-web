import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const sections = [
  {
    title: "一、我们收集哪些信息",
    body: [
      "您主动填写的预约信息：姓名、联系电话、电子邮箱、案件类型与案情概述。",
      "您与站内 AI 助手（文字咨询、语音接待）交互时输入的内容。",
      "为保障服务可用性而产生的必要技术日志，例如访问时间与错误信息。",
    ],
  },
  {
    title: "二、我们如何使用这些信息",
    body: [
      "与您取得联系、安排面谈并提供初步法律分析。",
      "生成 AI 初步分析结果，帮助我们更快理解您的需求。",
      "在去除可识别个人身份的信息后，用于改进网站与服务质量。",
    ],
  },
  {
    title: "三、信息的共享与委托处理",
    body: [
      "我们不会出售您的个人信息，也不会向无关第三方提供。",
      "为实现 AI 咨询与语音接待功能，您输入的内容会传输至我们委托的技术服务商进行处理；此类服务商仅能按照我们的指示处理数据。",
      "法律法规或司法机关依法要求时，我们将在必要范围内配合提供。",
    ],
  },
  {
    title: "四、信息的存储与保护",
    body: [
      "预约信息存储于开启了访问控制的数据库中，仅授权人员可查阅。",
      "我们采取传输加密等技术措施防止信息泄露、篡改或丢失。",
      "除法律法规另有要求外，我们仅在实现上述目的所必需的期限内保留您的信息。",
    ],
  },
  {
    title: "五、您的权利",
    body: [
      "您有权查阅、更正或删除您提交的个人信息，也可撤回此前作出的同意。",
      "如需行使上述权利，请通过下方联系方式与我们联系，我们将在核实身份后及时处理。",
    ],
  },
  {
    title: "六、关于 AI 功能的特别提示",
    body: [
      "站内 AI 助手输出的内容由算法自动生成，仅供参考，不构成正式法律意见，也不因此建立委托代理关系。",
      "请避免在 AI 对话中提供不必要的敏感个人信息或涉密材料。",
    ],
  },
];

const Privacy = () => (
  <div className="min-h-screen bg-background py-16">
    <div className="container mx-auto max-w-3xl px-4">
      <Link
        to="/"
        className="mb-10 inline-flex items-center gap-2 font-body text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      <h1 className="mb-3 font-display text-3xl font-semibold text-foreground md:text-4xl">隐私政策</h1>
      <p className="mb-12 font-body text-sm text-muted-foreground">最近更新：2026 年 8 月</p>

      <div className="space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="mb-4 font-display text-lg font-semibold text-foreground">{section.title}</h2>
            <ul className="space-y-2.5">
              {section.body.map((item) => (
                <li key={item} className="flex items-start gap-2.5 font-body text-sm leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="mb-4 font-display text-lg font-semibold text-foreground">七、联系我们</h2>
          <p className="font-body text-sm leading-relaxed text-muted-foreground">
            如对本政策有任何疑问，请发送邮件至 contact@dingsheng-law.com，或致电 400-888-9999。
          </p>
        </section>
      </div>

      <p className="mt-16 border-t border-border pt-6 font-body text-xs leading-relaxed text-muted-foreground/70">
        本页为示例文本，正式发布前请由法务与合规人员按实际业务场景审阅、补充并确认适用的法律法规要求。
      </p>
    </div>
  </div>
);

export default Privacy;
