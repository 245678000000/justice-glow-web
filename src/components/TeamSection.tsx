import { motion } from "framer-motion";
import { useState } from "react";
import lawyerZhang from "@/assets/lawyer-zhang.jpg";
import lawyerLi from "@/assets/lawyer-li.jpg";
import lawyerWang from "@/assets/lawyer-wang.jpg";
import lawyerChen from "@/assets/lawyer-chen.jpg";
import lawyerLiu from "@/assets/lawyer-liu.jpg";
import lawyerZhao from "@/assets/lawyer-zhao.jpg";

const lawyers = [
  {
    name: "张伟明",
    position: "创始合伙人 | 争议解决部主任",
    license: "执业证号：1110120XXXXXXXX",
    tags: ["商事诉讼", "跨境仲裁", "执行保全"],
    bio: "张伟明律师拥有逾二十年争议解决领域执业经验，曾主办多起标的额超十亿元的重大商事诉讼案件，在跨境仲裁与复杂商事争议中具有丰富经验与卓越业绩。",
    photo: lawyerZhang,
  },
  {
    name: "李雅琴",
    position: "高级合伙人 | 公司商事部主任",
    license: "执业证号：1110120XXXXXXXX",
    tags: ["跨境并购", "合规审查", "反垄断"],
    bio: "李雅琴律师专注于公司并购与合规领域，累计参与交易金额逾百亿元，曾为多家上市公司及跨国企业提供全流程法律服务与战略顾问支持。",
    photo: lawyerLi,
  },
  {
    name: "王志强",
    position: "合伙人 | 刑事辩护部主任",
    license: "执业证号：1110120XXXXXXXX",
    tags: ["经济犯罪", "职务犯罪", "刑事合规"],
    bio: "王志强律师在刑事辩护领域深耕十五年，擅长经济犯罪与职务犯罪辩护，多次取得无罪判决及不起诉决定，在业界享有极高声誉。",
    photo: lawyerWang,
  },
  {
    name: "陈思远",
    position: "合伙人 | 知识产权部",
    license: "执业证号：1110120XXXXXXXX",
    tags: ["专利布局", "商标诉讼", "技术许可"],
    bio: "陈思远律师兼具工科与法学背景，专注于知识产权保护与技术交易，为科技企业提供从专利布局到维权诉讼的一站式法律解决方案。",
    photo: lawyerChen,
  },
  {
    name: "刘婉清",
    position: "资深律师 | 资本市场部",
    license: "执业证号：1110120XXXXXXXX",
    tags: ["IPO上市", "债券发行", "私募基金"],
    bio: "刘婉清律师在资本市场领域拥有丰富的项目经验，曾参与多家企业境内外上市项目，精通证券法规与合规要求。",
    photo: lawyerLiu,
  },
  {
    name: "赵鹏飞",
    position: "律师 | 劳动人事部",
    license: "执业证号：1110120XXXXXXXX",
    tags: ["股权激励", "劳动仲裁", "竞业限制"],
    bio: "赵鹏飞律师专注于劳动人事法律服务，在股权激励方案设计、劳动争议处理及企业用工合规方面具有丰富实务经验。",
    photo: lawyerZhao,
  },
];

const LawyerCard = ({ lawyer, index }: { lawyer: typeof lawyers[0]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="border border-border bg-card p-8"
    >
      <div className="flex gap-6">
        <div className="w-20 h-24 shrink-0 overflow-hidden bg-navy">
          <img
            src={lawyer.photo}
            alt={lawyer.name}
            className="w-full h-full object-cover img-professional"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl font-semibold text-foreground mb-1">
            {lawyer.name}
          </h3>
          <p className="font-body text-sm text-muted-foreground mb-1">
            {lawyer.position}
          </p>
          <p className="font-mono text-xs text-muted-foreground/60">
            {lawyer.license}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4 mb-4">
        {lawyer.tags.map((tag) => (
          <span
            key={tag}
            className="font-body text-xs px-2 py-0.5 border border-accent/40 text-accent rounded-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative">
        <p
          className={`font-body text-sm text-muted-foreground leading-relaxed ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {lawyer.bio}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="font-body text-xs text-accent hover:text-accent/80 mt-2 transition-colors"
        >
          {expanded ? "收起" : "展开详情 →"}
        </button>
      </div>
    </motion.div>
  );
};

const TeamSection = () => (
  <section id="team" className="py-24 lg:py-[100px] bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
          专业团队
        </h2>
        <div className="w-12 h-px bg-accent mx-auto mb-4" />
        <p className="font-body text-muted-foreground max-w-xl mx-auto text-sm">
          汇聚行业精英，以丰富经验和专业素养为您保驾护航
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lawyers.map((l, i) => (
          <LawyerCard key={l.name} lawyer={l} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
