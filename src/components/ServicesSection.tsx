import { motion } from "framer-motion";
import { Scale, Building2, Users, FileText, ShieldCheck, Gavel } from "lucide-react";

const services = [
  { icon: Scale, title: "民商事诉讼", desc: "合同纠纷、侵权责任、债权债务等民商事案件的代理与诉讼。" },
  { icon: Building2, title: "公司法务", desc: "企业设立、股权架构、合规审查、并购重组等全流程法律服务。" },
  { icon: Users, title: "婚姻家事", desc: "离婚诉讼、财产分割、子女抚养、遗产继承等家事法律事务。" },
  { icon: FileText, title: "知识产权", desc: "商标注册、专利申请、著作权保护及侵权维权代理。" },
  { icon: ShieldCheck, title: "刑事辩护", desc: "刑事案件辩护、取保候审、刑事申诉及法律风险防控。" },
  { icon: Gavel, title: "劳动争议", desc: "劳动合同纠纷、工伤赔偿、社保争议等劳动法律服务。" },
];

const ServicesSection = () => (
  <section id="services" className="py-20 lg:py-28 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          服务领域
        </h2>
        <div className="w-16 h-1 bg-gold mx-auto mb-4" />
        <p className="font-body text-muted-foreground max-w-xl mx-auto">
          涵盖六大核心法律领域，为您提供专业、精准的法律解决方案
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group p-8 rounded-xl border border-border bg-card hover:shadow-xl hover:-translate-y-1 hover:border-gold/50 transition-all duration-300"
          >
            <s.icon className="h-10 w-10 text-gold mb-5" />
            <h3 className="font-display text-xl font-semibold text-card-foreground mb-3">
              {s.title}
            </h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              {s.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServicesSection;
