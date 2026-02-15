import { Mail, Phone, MapPin } from "lucide-react";

const navLinks = [
  { label: "首页", href: "#hero" },
  { label: "业务领域", href: "#services" },
  { label: "专业团队", href: "#team" },
  { label: "代表业绩", href: "#cases" },
  { label: "预约咨询", href: "#contact" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-navy pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-lg font-semibold text-accent mb-4 tracking-wider">鼎盛律所</h3>
            <p className="font-body text-sm text-navy-foreground/50 leading-relaxed">
              鼎盛律师事务所成立于2008年，是一家专注于商事法律服务的综合性律师事务所。我们秉承"专业、诚信、高效"的服务理念，致力于为企业与机构提供值得信赖的法律解决方案。
            </p>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-navy-foreground/80 mb-4">快速链接</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-body text-sm text-navy-foreground/50 hover:text-accent transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-navy-foreground/80 mb-4">联系方式</h3>
            <ul className="space-y-3 font-body text-sm text-navy-foreground/50">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-accent/60 mt-0.5 shrink-0" />
                北京市朝阳区建国路88号SOHO现代城A座18层
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent/60 shrink-0" />
                400-888-9999
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent/60 shrink-0" />
                contact@dingsheng-law.com
              </li>
            </ul>
          </div>
        </div>

        {/* 法律声明 */}
        <div className="border-t border-navy-foreground/10 pt-6 space-y-2 text-center">
          <p className="font-body text-xs text-navy-foreground/30">
            © 2026 鼎盛律师事务所 版权所有 &nbsp;|&nbsp; 京ICP备XXXXXXXX号-1 &nbsp;|&nbsp; 执业许可证号：31110XXXXXXXX
          </p>
          <p className="font-body text-xs text-navy-foreground/30 max-w-2xl mx-auto">
            本网站信息仅供参考，不构成正式法律意见。具体案件请咨询专业律师，律师将根据具体情况提供初步法律分析。
          </p>
          <p className="font-body text-xs">
            <a href="/privacy" className="text-navy-foreground/30 hover:text-accent transition-colors">
              隐私政策
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
