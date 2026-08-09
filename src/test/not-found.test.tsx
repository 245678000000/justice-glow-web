import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotFound from "@/pages/NotFound";

describe("NotFound", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("展示中文的 404 提示与返回首页链接", () => {
    render(
      <MemoryRouter initialEntries={["/not-a-real-page"]}>
        <NotFound />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("抱歉，页面不存在")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "返回首页" })).toHaveAttribute("href", "/");
  });

  it("把未命中的路径记录到控制台", () => {
    render(
      <MemoryRouter initialEntries={["/not-a-real-page"]}>
        <NotFound />
      </MemoryRouter>
    );

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("404 Error"),
      "/not-a-real-page"
    );
  });
});
