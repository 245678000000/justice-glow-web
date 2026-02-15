import { ShieldCheck, Award, BarChart3 } from "lucide-react";

const credentials = [
  {
    icon: ShieldCheck,
    title: "资质认证",
    lines: ["中华人民共和国司法部备案", "执业许可证号：31110000MD0285364T"],
  },
  {
    icon: Award,
    title: "行业地位",
    lines: ["钱伯斯 (Chambers) 上榜律所", "ALB 中国法律大奖推荐"],
  },
  {
    icon: BarChart3,
    title: "执业数据",
    stats: [
      { value: "15", unit: "年", label: "执业经验" },
      { value: "35", unit: "位", label: "资深律师" },
      { value: "92", unit: "%", label: "胜诉率" },
    ],
  },
];

const TrustBar = () => (
  <section className="py-12 bg-secondary border-b border-border">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {credentials.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="shrink-0 w-10 h-10 flex items-center justify-center border border-accent/30 rounded-sm">
              <item.icon className="h-5 w-5 text-accent stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground mb-1 tracking-wide">
                {item.title}
              </h3>
              {item.lines ? (
                <div className="space-y-0.5">
                  {item.lines.map((line) => (
                    <p key={line} className="font-body text-xs text-muted-foreground">{line}</p>
                  ))}
                </div>
              ) : item.stats ? (
                <div className="flex items-baseline gap-4">
                  {item.stats.map((s) => (
                    <span key={s.label} className="text-xs text-muted-foreground">
                      <span className="font-mono text-sm font-semibold text-foreground">{s.value}</span>
                      <span className="text-muted-foreground">{s.unit}{s.label}</span>
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBar;
