import { motion } from "framer-motion";
import { Scale, Building2, Lightbulb, TrendingUp, ShieldCheck, Users } from "lucide-react";

const services = [
  {
    icon: Scale,
    title: "争议解决",
    subtitle: "诉讼与仲裁",
    details: ["商事诉讼与仲裁代理", "跨境争议解决", "执行与保全程序"],
  },
  {
    icon: Building2,
    title: "公司商事",
    subtitle: "并购与合规",
    details: ["跨境并购", "尽职调查", "反垄断申报"],
  },
  {
    icon: Lightbulb,
    title: "知识产权",
    subtitle: "专利与商标",
    details: ["专利申请与布局", "商标维权与诉讼", "技术许可与转让"],
  },
  {
    icon: TrendingUp,
    title: "资本市场",
    subtitle: "IPO与债券",
    details: ["境内外IPO", "债券发行与合规", "私募股权投资"],
  },
  {
    icon: ShieldCheck,
    title: "刑事辩护",
    subtitle: "白领犯罪与职务案件",
    details: ["经济犯罪辩护", "职务犯罪代理", "刑事合规体系建设"],
  },
  {
    icon: Users,
    title: "劳动人事",
    subtitle: "股权激励与争议",
    details: ["股权激励方案设计", "劳动争议仲裁与诉讼", "高管合规与竞业限制"],
  },
];

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
            <button className="font-body text-sm text-accent hover:text-accent/80 transition-colors tracking-wide">
              了解详情 →
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
