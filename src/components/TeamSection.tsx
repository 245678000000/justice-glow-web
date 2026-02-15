import { motion } from "framer-motion";

const lawyers = [
  { name: "张伟明", title: "高级合伙人 · 民商事诉讼", initials: "张" },
  { name: "李雅琴", title: "合伙人 · 公司法务", initials: "李" },
  { name: "王志强", title: "合伙人 · 刑事辩护", initials: "王" },
  { name: "陈思远", title: "资深律师 · 知识产权", initials: "陈" },
  { name: "刘婉清", title: "资深律师 · 婚姻家事", initials: "刘" },
  { name: "赵鹏飞", title: "律师 · 劳动争议", initials: "赵" },
];

const TeamSection = () => (
  <section id="team" className="py-20 lg:py-28 bg-secondary/30">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
          专业团队
        </h2>
        <div className="w-16 h-1 bg-gold mx-auto mb-4" />
        <p className="font-body text-muted-foreground max-w-xl mx-auto">
          汇聚行业精英，以丰富经验和专业素养为您保驾护航
        </p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
        {lawyers.map((l, i) => (
          <motion.div
            key={l.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="text-center"
          >
            <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-navy flex items-center justify-center">
              <span className="font-display text-2xl text-gold">{l.initials}</span>
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground">{l.name}</h3>
            <div className="w-8 h-0.5 bg-gold mx-auto my-2" />
            <p className="font-body text-xs text-muted-foreground">{l.title}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TeamSection;
