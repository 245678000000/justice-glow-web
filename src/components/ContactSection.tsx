import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Sparkles, Scale, Lightbulb, ArrowRight, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "请输入姓名").max(50),
  phone: z.string().trim().min(1, "请输入电话").max(20),
  email: z.string().trim().email("请输入有效邮箱").max(100),
  caseType: z.string().min(1, "请选择案件类型"),
  description: z.string().trim().min(1, "请描述案情").max(1000),
});

type FormData = z.infer<typeof schema>;

interface AnalysisResult {
  case_type: string;
  summary: string;
  legal_areas: string[];
  key_points: string[];
  suggested_actions: string[];
}

const caseTypes = ["争议解决", "公司商事", "知识产权", "资本市场", "刑事辩护", "劳动人事", "其他"];

const ContactSection = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "", caseType: "", description: "" },
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("submit-contact", {
        body: data,
      });
      if (error) throw error;
      toast({ title: "提交成功", description: "我们将在24小时内与您联系，提供初步法律分析。" });
      form.reset();
      setAnalysisResult(null);
    } catch (err) {
      console.error("Submit error:", err);
      toast({ title: "提交失败", description: "请稍后重试或直接拨打我们的电话。", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleAnalyze = async () => {
    const description = form.getValues("description")?.trim();
    if (!description || description.length < 5) {
      toast({ title: "请先输入案情描述", description: "至少输入5个字以便AI进行分析。", variant: "destructive" });
      return;
    }

    setAnalyzing(true);
    setAnalysisResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("analyze-case", {
        body: { description },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setAnalysisResult(data);

      if (data.case_type && caseTypes.includes(data.case_type)) {
        form.setValue("caseType", data.case_type);
      }

      toast({ title: "分析完成", description: "AI 已生成初步法律分析，请查看下方结果。" });
    } catch (err: any) {
      console.error("Analyze error:", err);
      const msg = err?.message || "分析失败，请稍后重试";
      toast({ title: "分析失败", description: msg, variant: "destructive" });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-[100px] bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
            预约面谈
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mb-4" />
          <p className="font-body text-muted-foreground text-sm">
            填写以下信息，我们的资深律师将尽快与您联系，提供初步法律分析
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-sm">姓名</FormLabel>
                    <FormControl><Input placeholder="请输入姓名" className="dark:bg-card" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-body text-sm">电话</FormLabel>
                    <FormControl><Input placeholder="请输入电话" className="dark:bg-card" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-sm">邮箱</FormLabel>
                  <FormControl><Input type="email" placeholder="请输入邮箱" className="dark:bg-card" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-sm">案情概述</FormLabel>
                  <FormControl><Textarea placeholder="请简要描述您的法律需求" rows={4} className="dark:bg-card" {...field} /></FormControl>
                  <FormMessage />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    disabled={analyzing}
                    onClick={handleAnalyze}
                    className="mt-2 text-accent hover:text-accent/80 hover:bg-accent/10 font-body text-xs gap-1.5"
                  >
                    {analyzing ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        AI 分析中...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-3.5 w-3.5" />
                        AI 智能分析
                      </>
                    )}
                  </Button>
                </FormItem>
              )} />

              <FormField control={form.control} name="caseType" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-sm">
                    案件类型
                    {analysisResult && field.value === analysisResult.case_type && (
                      <span className="ml-2 text-xs text-accent font-normal">✦ AI 建议</span>
                    )}
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger><SelectValue placeholder="请选择案件类型" /></SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {caseTypes.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <AnimatePresence>
                {analysisResult && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className="border-accent/20 bg-accent/5">
                      <CardContent className="pt-5 pb-4 px-5 space-y-4">
                        <div className="flex items-center gap-2 text-accent font-body text-sm font-medium">
                          <Sparkles className="h-4 w-4" />
                          AI 初步分析
                        </div>

                        <p className="font-body text-sm text-foreground/80">{analysisResult.summary}</p>

                        {analysisResult.legal_areas.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {analysisResult.legal_areas.map((area, i) => (
                              <span key={i} className="text-xs font-body px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                                {area}
                              </span>
                            ))}
                          </div>
                        )}

                        {analysisResult.key_points.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground font-medium">
                              <Scale className="h-3.5 w-3.5" />
                              关键法律要点
                            </div>
                            <ul className="space-y-1.5">
                              {analysisResult.key_points.map((point, i) => (
                                <li key={i} className="font-body text-xs text-foreground/70 flex items-start gap-2">
                                  <span className="text-accent mt-0.5">•</span>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {analysisResult.suggested_actions.length > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center gap-1.5 text-xs font-body text-muted-foreground font-medium">
                              <Lightbulb className="h-3.5 w-3.5" />
                              建议行动
                            </div>
                            <ul className="space-y-1.5">
                              {analysisResult.suggested_actions.map((action, i) => (
                                <li key={i} className="font-body text-xs text-foreground/70 flex items-start gap-2">
                                  <ArrowRight className="h-3 w-3 text-accent mt-0.5 shrink-0" />
                                  {action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <p className="font-body text-[10px] text-muted-foreground/60 pt-1">
                          * 以上分析由 AI 生成，仅供参考，不构成正式法律意见
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                variant="outline"
                disabled={submitting}
                className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground font-body text-sm py-6 tracking-wide"
              >
                {submitting ? "提交中..." : "提交预约"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
