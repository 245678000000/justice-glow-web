import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="text-center">
        <h1 className="mb-4 font-display text-5xl font-semibold text-foreground">404</h1>
        <p className="mb-2 font-body text-xl text-muted-foreground">抱歉，页面不存在</p>
        <p className="mb-6 font-body text-sm text-muted-foreground/70">
          您访问的地址可能已被移除，或链接有误。
        </p>
        <Link to="/" className="font-body text-accent underline underline-offset-4 hover:text-accent/80">
          返回首页
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
