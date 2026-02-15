import { motion } from "framer-motion";

const cases = [
  {
    title: "某上市公司重大资产重组案",
    caseNo: "（2023）京民初 XX 号",
    amount: "¥12.6亿元",
    result: "全面胜诉，成功完成资产重组",
    lawyers: ["张伟明", "李雅琴"],
    category: "公司商事",
  },
  {
    title: "某科技企业跨境商标侵权案",
    caseNo: "（2023）京知民终 XX 号",
    amount: "¥8,000万元",
    result: "为客户挽回全部损失并获赔偿",
    lawyers: ["陈思远"],
    category: "知识产权",
  },
  {
    title: "某建设集团工程合同争议案",
    caseNo: "（2022）京仲裁字第 XXX 号",
    amount: "¥3.2亿元",
    result: "仲裁裁决支持我方全部请求",
    lawyers: ["张伟明", "赵鹏飞"],
    category: "争议解决",
  },
  {
    title: "某金融机构高管职务犯罪案",
    caseNo: "（2023）京刑初 XX 号",
    amount: "——",
    result: "取得不起诉决定",
    lawyers: ["王志强"],
    category: "刑事辩护",
  },
];

const CasesSection = () => (
  <section id="cases" className="py-24 lg:py-[100px] bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
          代表性业绩
        </h2>
        <div className="w-12 h-px bg-accent mx-auto mb-4" />
        <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm">
          精选代表性案例，展现专业实力与服务品质
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {cases.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="border border-border bg-card p-6 md:p-10 hover:shadow-subtle transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <span className="font-body text-xs tracking-wider text-accent border border-accent/30 px-3 py-1">
                {c.category}
              </span>
              <span className="font-mono text-xs text-muted-foreground/60">{c.caseNo}</span>
            </div>

            <h3 className="font-display text-lg font-semibold text-card-foreground mb-6">
              {c.title}
            </h3>

            <div className="grid grid-cols-2 gap-4 mb-6 py-4 border-t border-b border-border">
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">争议金额</p>
                <p className="font-mono text-sm font-semibold text-foreground">{c.amount}</p>
              </div>
              <div>
                <p className="font-body text-xs text-muted-foreground mb-1">代理结果</p>
                <p className="font-body text-sm font-semibold text-foreground">{c.result}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-body text-xs text-muted-foreground">主办律师：</span>
              {c.lawyers.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    document.getElementById("team")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="font-body text-xs text-accent hover:text-accent/80 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default CasesSection;
