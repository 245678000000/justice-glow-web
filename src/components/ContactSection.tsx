import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "请输入姓名").max(50),
  phone: z.string().trim().min(1, "请输入电话").max(20),
  email: z.string().trim().email("请输入有效邮箱").max(100),
  caseType: z.string().min(1, "请选择案件类型"),
  description: z.string().trim().min(1, "请描述案情").max(1000),
});

type FormData = z.infer<typeof schema>;

const caseTypes = ["争议解决", "公司商事", "知识产权", "资本市场", "刑事辩护", "劳动人事", "其他"];

const ContactSection = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
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
    } catch (err) {
      console.error("Submit error:", err);
      toast({ title: "提交失败", description: "请稍后重试或直接拨打我们的电话。", variant: "destructive" });
    } finally {
      setSubmitting(false);
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

              <FormField control={form.control} name="caseType" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-sm">案件类型</FormLabel>
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

              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-sm">案情概述</FormLabel>
                  <FormControl><Textarea placeholder="请简要描述您的法律需求" rows={4} className="dark:bg-card" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

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
