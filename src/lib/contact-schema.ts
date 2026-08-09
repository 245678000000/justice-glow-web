import { z } from "zod";

export const caseTypes = [
  "争议解决",
  "公司商事",
  "知识产权",
  "资本市场",
  "刑事辩护",
  "劳动人事",
  "其他",
] as const;

export type CaseType = (typeof caseTypes)[number];

/** 手机号（1 开头 11 位）或带区号的固定电话，允许使用 - 和空格分隔 */
const PHONE_RE = /^(1[3-9]\d{9}|0\d{2,3}[-\s]?\d{7,8})$/;

export const contactSchema = z.object({
  name: z.string().trim().min(1, "请输入姓名").max(50, "姓名不超过50个字符"),
  phone: z
    .string()
    .trim()
    .min(1, "请输入电话")
    .max(20, "电话不超过20个字符")
    .refine((value) => PHONE_RE.test(value.replace(/[\s-]/g, "")), "请输入有效的手机号或固定电话"),
  email: z.string().trim().email("请输入有效邮箱").max(100, "邮箱不超过100个字符"),
  caseType: z.string().min(1, "请选择案件类型"),
  description: z
    .string()
    .trim()
    .min(10, "请至少输入10个字，以便我们初步了解案情")
    .max(1000, "案情描述不超过1000个字符"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

/** 判断 AI 返回的案件类型是否在可选项内 */
export const isKnownCaseType = (value: string): value is CaseType =>
  (caseTypes as readonly string[]).includes(value);
