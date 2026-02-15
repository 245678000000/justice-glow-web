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
    license: "执业证号：11101200310528463",
    tags: ["商事诉讼", "跨境仲裁", "执行保全"],
    bio: "张伟明律师拥有逾二十年争议解决领域执业经验，曾主办多起标的额超十亿元的重大商事诉讼案件，在跨境仲裁与复杂商事争议中具有丰富经验与卓越业绩。",
    fullBio: `张伟明律师毕业于北京大学法学院，获法学硕士学位，后赴英国伦敦大学学院（UCL）进修国际商事仲裁课程。自2003年执业以来，张律师专注于商事诉讼与国际仲裁领域，累计代理案件标的额逾五十亿元。\n\n代表性业绩包括：某大型国企与境外投资方十五亿元股权争议仲裁案（ICC仲裁，胜诉）；某上市公司系列关联交易纠纷诉讼（涉及资金逾八亿元）；某跨国能源企业投资争端调解与仲裁。\n\n张律师现任中国国际经济贸易仲裁委员会（CIETAC）仲裁员、北京仲裁委员会仲裁员、中国国际商会仲裁委员会委员。曾获《商法》杂志"年度卓越争议解决律师"称号，多次入选Chambers亚太区争议解决领域推荐律师。`,
    photo: lawyerZhang,
  },
  {
    name: "李雅琴",
    position: "高级合伙人 | 公司商事部主任",
    license: "执业证号：11101200511792804",
    tags: ["跨境并购", "合规审查", "反垄断"],
    bio: "李雅琴律师专注于公司并购与合规领域，累计参与交易金额逾百亿元，曾为多家上市公司及跨国企业提供全流程法律服务与战略顾问支持。",
    fullBio: `李雅琴律师毕业于中国政法大学，获法学学士和硕士学位，后取得美国哥伦比亚大学法学院LL.M.学位，并通过纽约州律师资格考试。李律师在公司并购领域深耕十八年，累计参与交易金额逾两百亿元。\n\n代表性项目包括：某A股上市公司收购欧洲工业集团（交易额约四十亿元）；某跨国科技企业在华设立合资公司及后续重组；某国有企业混合所有制改革方案设计与实施；多起涉及国家市场监督管理总局的经营者集中申报项目。\n\n李律师现为中国并购公会理事、中国国际商会合规委员会委员。曾获ALB China"年度最佳并购律师"提名，连续五年入选《法律500强》中国区公司并购领域推荐律师。`,
    photo: lawyerLi,
  },
  {
    name: "王志强",
    position: "合伙人 | 刑事辩护部主任",
    license: "执业证号：11101200810647291",
    tags: ["经济犯罪", "职务犯罪", "刑事合规"],
    bio: "王志强律师在刑事辩护领域深耕十五年，擅长经济犯罪与职务犯罪辩护，多次取得无罪判决及不起诉决定，在业界享有极高声誉。",
    fullBio: `王志强律师毕业于清华大学法学院，获法学博士学位。执业十五年间，王律师专注于经济犯罪和职务犯罪辩护，累计办理刑事案件逾三百件，其中取得无罪判决十二件、不起诉决定二十余件。\n\n代表性案例包括：某上市公司高管涉嫌内幕交易案（无罪判决）；某国企负责人职务侵占案（检察院作出不起诉决定）；某金融机构高管涉嫌非法吸收公众存款案（成功辩护为合法经营行为）；某民营企业家涉嫌合同诈骗案（改判为民事纠纷）。\n\n王律师现任全国律师协会刑事专业委员会委员、北京市律师协会刑事辩护委员会副主任。曾获司法部"全国优秀刑事辩护律师"称号，多次在全国性刑事辩护论坛上发表主题演讲。`,
    photo: lawyerWang,
  },
  {
    name: "陈思远",
    position: "合伙人 | 知识产权部",
    license: "执业证号：11101201210853672",
    tags: ["专利布局", "商标诉讼", "技术许可"],
    bio: "陈思远律师兼具工科与法学背景，专注于知识产权保护与技术交易，为科技企业提供从专利布局到维权诉讼的一站式法律解决方案。",
    fullBio: `陈思远律师本科毕业于上海交通大学电子信息工程专业，后获华东政法大学知识产权法硕士学位。同时具备专利代理师资格。陈律师在知识产权领域执业十二年，服务客户涵盖人工智能、半导体、生物医药等高科技行业。\n\n代表性业绩包括：为某头部AI企业构建覆盖核心算法的二百余项专利组合；代理某知名消费电子品牌商标侵权系列维权案件（涉及全国十余省份）；协助某生物制药企业完成关键技术专利许可谈判（许可费逾亿元）；在多起标准必要专利（SEP）许可费率争议中担任中方律师。\n\n陈律师现任中华全国专利代理人协会理事、中国知识产权研究会会员。曾获"中国知识产权领域年度影响力律师"称号。`,
    photo: lawyerChen,
  },
  {
    name: "刘婉清",
    position: "资深律师 | 资本市场部",
    license: "执业证号：11101201410926138",
    tags: ["IPO上市", "债券发行", "私募基金"],
    bio: "刘婉清律师在资本市场领域拥有丰富的项目经验，曾参与多家企业境内外上市项目，精通证券法规与合规要求。",
    fullBio: "刘婉清律师毕业于复旦大学法学院，获法学硕士学位，并持有中国注册会计师（CPA）资格。刘律师在资本市场领域执业十年，深谙境内外证券监管规则。\n\n代表性项目包括：某科技企业科创板IPO项目（募资约三十亿元）；某制造业企业港股上市项目；某地方政府平台公司企业债发行项目（规模五十亿元）；某知名PE基金设立及多轮募集项目（管理规模逾百亿元）；多家上市公司再融资及重大资产重组项目。\n\n刘律师在证券合规、信息披露及投资者保护方面具有专业优势，曾多次为证券从业人员提供合规培训。现为中国证券法学研究会会员。",
    photo: lawyerLiu,
  },
  {
    name: "赵鹏飞",
    position: "律师 | 劳动人事部",
    license: "执业证号：11101201610783549",
    tags: ["股权激励", "劳动仲裁", "竞业限制"],
    bio: "赵鹏飞律师专注于劳动人事法律服务，在股权激励方案设计、劳动争议处理及企业用工合规方面具有丰富实务经验。",
    fullBio: "赵鹏飞律师毕业于中国人民大学法学院劳动法与社会保障法方向，获法学硕士学位。赵律师执业八年来，专注于劳动人事及股权激励领域，累计为五十余家企业提供常年法律顾问服务。\n\n代表性业绩包括：为某互联网头部企业设计全员持股计划及期权激励方案（覆盖员工逾千人）；代理某跨国企业大规模裁员项目的劳动争议系列案件（涉及员工二百余人）；为某上市公司设计高管竞业限制协议体系及商业秘密保护制度；协助多家外资企业处理在华用工合规事务及劳动监察应对。\n\n赵律师现任北京市劳动法与社会保障法学研究会理事。曾在《中国劳动》《人力资源》等专业期刊发表多篇学术论文，并受邀在多场企业人力资源管理论坛上担任主讲嘉宾。",
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
      className="border border-border bg-card p-5 md:p-8"
    >
      <div className="flex gap-6">
        <div className="w-20 h-24 shrink-0 overflow-hidden bg-navy">
          <img
            src={lawyer.photo}
            alt={lawyer.name}
            className="w-full h-full object-cover"
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
        <p className="font-body text-sm text-muted-foreground leading-relaxed">
          {lawyer.bio}
        </p>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-3"
          >
            {lawyer.fullBio.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="font-body text-sm text-muted-foreground leading-relaxed mb-3 last:mb-0">
                {paragraph}
              </p>
            ))}
          </motion.div>
        )}
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
