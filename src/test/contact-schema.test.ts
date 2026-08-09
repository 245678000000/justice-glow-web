import { describe, it, expect } from "vitest";
import { contactSchema, isKnownCaseType, caseTypes } from "@/lib/contact-schema";

const validInput = {
  name: "张三",
  phone: "13800138000",
  email: "zhangsan@example.com",
  caseType: "公司商事",
  description: "公司与供应商签订的采购合同出现履约争议，需要评估解约风险。",
};

describe("contactSchema", () => {
  it("接受完整且格式正确的表单", () => {
    const result = contactSchema.safeParse(validInput);
    expect(result.success).toBe(true);
  });

  it("会去除首尾空白", () => {
    const result = contactSchema.parse({ ...validInput, name: "  张三  " });
    expect(result.name).toBe("张三");
  });

  it.each([
    ["138-0013-8000", true],
    ["010-88886666", true],
    ["01088886666", true],
    ["12345", false],
    ["23800138000", false],
    ["abcdefghijk", false],
  ])("电话 %s 的校验结果应为 %s", (phone, expected) => {
    expect(contactSchema.safeParse({ ...validInput, phone }).success).toBe(expected);
  });

  it("拒绝非法邮箱", () => {
    expect(contactSchema.safeParse({ ...validInput, email: "not-an-email" }).success).toBe(false);
  });

  it("要求案情描述至少 10 个字", () => {
    expect(contactSchema.safeParse({ ...validInput, description: "太短了" }).success).toBe(false);
  });

  it("拒绝超长的案情描述", () => {
    const result = contactSchema.safeParse({ ...validInput, description: "а".repeat(1001) });
    expect(result.success).toBe(false);
  });

  it("要求选择案件类型", () => {
    expect(contactSchema.safeParse({ ...validInput, caseType: "" }).success).toBe(false);
  });
});

describe("isKnownCaseType", () => {
  it("识别所有内置案件类型", () => {
    for (const type of caseTypes) {
      expect(isKnownCaseType(type)).toBe(true);
    }
  });

  it("拒绝 AI 返回的未知类型", () => {
    expect(isKnownCaseType("行政复议")).toBe(false);
  });
});
