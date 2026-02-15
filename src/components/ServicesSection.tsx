import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Scale, Building2, Lightbulb, TrendingUp, ShieldCheck, Users } from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "争议解决",
    subtitle: "诉讼与仲裁",
    details: ["商事诉讼与仲裁代理", "跨境争议解决", "执行与保全程序"],
    description: "鼎盛争议解决团队在商事诉讼和国际仲裁领域拥有二十余年深厚积淀，累计代理案件标的额逾百亿元。团队成员精通ICC、HKIAC、CIETAC等主要仲裁机构规则，曾在多起跨境投资争端中为客户赢得有利裁决。在国内诉讼方面，团队擅长处理复杂合同纠纷、股权争议及金融衍生品纠纷，多次在最高人民法院取得标志性判决。团队同时在执行与财产保全领域具备丰富经验，能够为客户提供从争议预防到判决执行的全流程法律服务。",
  },
  {
    icon: Building2,
    title: "公司商事",
    subtitle: "并购与合规",
    details: ["跨境并购", "尽职调查", "反垄断申报"],
    description: "公司商事团队专注于为境内外企业提供全方位并购交易和合规顾问服务。团队累计参与交易金额超过三百亿元，涵盖股权收购、资产重组、合资企业设立及私有化退市等多种交易类型。在尽职调查方面，团队建立了系统化的调查框架，能够精准识别交易风险。在反垄断申报领域，团队具有丰富的国家市场监督管理总局申报经验，曾协助多家跨国企业顺利完成经营者集中审查。",
  },
  {
    icon: Lightbulb,
    title: "知识产权",
    subtitle: "专利与商标",
    details: ["专利申请与布局", "商标维权与诉讼", "技术许可与转让"],
    description: "知识产权团队由具备理工科和法学双重背景的专业律师组成，能够深入理解技术方案本质，为客户提供精准的知识产权保护策略。团队在专利布局方面拥有丰富经验，已协助多家科技企业构建覆盖核心技术的专利组合。在商标维权领域，团队成功代理了大量商标侵权及不正当竞争案件，维护了众多知名品牌的合法权益。同时，团队在技术许可、技术转让及软件著作权保护方面亦具有显著优势。",
  },
  {
    icon: TrendingUp,
    title: "资本市场",
    subtitle: "IPO与债券",
    details: ["境内外IPO", "债券发行与合规", "私募股权投资"],
    description: "资本市场团队为企业提供从上市筹备到持续合规的全周期法律服务。团队已成功协助数十家企业完成A股、港股及美股上市，涵盖主板、科创板、创业板等多个板块。在债券业务方面，团队参与了大量公司债、企业债及资产支持证券的发行项目。在私募股权领域，团队为多支基金提供设立、募集及投资退出的全程法律支持，深谙基金合规监管要求。",
  },
  {
    icon: ShieldCheck,
    title: "刑事辩护",
    subtitle: "白领犯罪与职务案件",
    details: ["经济犯罪辩护", "职务犯罪代理", "刑事合规体系建设"],
    description: "刑事辩护团队在经济犯罪和职务犯罪辩护领域具有卓越声誉，多次取得无罪判决、不起诉决定及显著轻判的优异成果。团队擅长处理涉及金融诈骗、内幕交易、商业贿赂、侵犯商业秘密等复杂经济犯罪案件。在刑事合规领域，团队为多家大型企业设计并实施了系统化的合规管理体系，有效预防刑事法律风险。团队同时在刑事控告、刑事附带民事诉讼方面具有丰富实践经验。",
  },
  {
    icon: Users,
    title: "劳动人事",
    subtitle: "股权激励与争议",
    details: ["股权激励方案设计", "劳动争议仲裁与诉讼", "高管合规与竞业限制"],
    description: "劳动人事团队为企业提供覆盖员工全生命周期的法律服务。在股权激励方面，团队已为上百家企业设计并实施了期权、限制性股票及虚拟股权等多种激励方案。在劳动争议处理方面，团队年均代理争议案件逾百件，在劳动仲裁及诉讼中保持极高的胜诉率。团队同时在高管聘用、竞业限制协议及商业秘密保护等领域具有深厚专业积累，能够帮助企业有效防控用工风险。",
  },
];

const ServiceCard = ({ s, i }: { s: typeof services[0]; i: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      key={s.title}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className="group p-10 border border-border bg-card hover:shadow-subtle hover:border-accent/40 transition-all duration-300"
    >
      <s.icon className="h-8 w-8 text-accent mb-6 stroke-[1.5]" />
      <h3 className="font-display text-lg font-semibold text-card-foreground mb-1">
        {s.title}
      </h3>
      <p className="font-body text-xs text-muted-foreground mb-5">{s.subtitle}</p>
      <ul className="space-y-2 mb-6">
        {s.details.map((d) => (
          <li key={d} className="font-body text-sm text-muted-foreground flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-accent/60 shrink-0" />
            {d}
          </li>
        ))}
      </ul>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mb-4"
          >
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {s.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setExpanded(!expanded)}
        className="font-body text-sm text-accent hover:text-accent/80 transition-colors tracking-wide"
      >
        {expanded ? "收起" : "了解详情 →"}
      </button>
    </motion.div>
  );
};

const ServicesSection = () => (
  <section id="services" className="py-24 lg:py-[100px] bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
          业务领域
        </h2>
        <div className="w-12 h-px bg-accent mx-auto mb-4" />
        <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm">
          涵盖六大核心法律领域，为企业与机构提供专业、精准的法律解决方案
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <ServiceCard key={s.title} s={s} i={i} />
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
