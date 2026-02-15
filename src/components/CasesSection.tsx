import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const cases = [
  {
    category: "公司法务",
    title: "某科技集团股权重组案",
    result: "成功完成涉及12亿元资产的股权重组，保障各方股东权益",
    testimonial: "鼎盛律所团队在极其复杂的股权架构中找到了最优方案，专业能力令人钦佩。",
    client: "张总",
    company: "某科技集团CEO",
  },
  {
    category: "知识产权",
    title: "跨国商标侵权维权案",
    result: "成功维权并获赔偿金额800万元，有效保护了客户品牌权益",
    testimonial: "从取证到庭审，每一步都精准有力，真正值得信赖的法律伙伴。",
    client: "李女士",
    company: "某消费品牌创始人",
  },
  {
    category: "民商事诉讼",
    title: "大型建设工程合同纠纷",
    result: "为客户挽回经济损失逾3000万元，案件历时仅6个月高效结案",
    testimonial: "面对复杂的工程纠纷，律师团队展现了卓越的专业水准和高效执行力。",
    client: "王总",
    company: "某建筑集团法务总监",
  },
];

const CasesSection = () => (
  <section id="cases" className="py-24 lg:py-[100px] bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
          成功案例
        </h2>
        <div className="w-12 h-px bg-accent mx-auto mb-4" />
        <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm">
          以实力说话，用成果证明——精选代表性案例与客户评价
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="bg-card border border-border p-10 flex flex-col justify-between hover:shadow-subtle transition-all duration-300"
          >
            <div>
              <span className="inline-block font-body text-xs tracking-wider text-accent border border-accent/30 px-3 py-1 mb-6">
                {c.category}
              </span>
              <h3 className="font-display text-lg font-semibold text-card-foreground mb-3">
                {c.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground mb-8 leading-relaxed">
                {c.result}
              </p>
            </div>

            <div className="border-t border-border pt-6">
              <Quote className="h-4 w-4 text-accent/40 mb-3" />
              <p className="font-body text-sm italic text-muted-foreground mb-4 leading-relaxed">
                "{c.testimonial}"
              </p>
              <div>
                <p className="font-body text-sm font-semibold text-card-foreground">{c.client}</p>
                <p className="font-body text-xs text-muted-foreground">{c.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CasesSection;
