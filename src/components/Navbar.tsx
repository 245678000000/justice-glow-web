import { useState, useEffect } from "react";
import { Menu, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";

const navItems = [
  { label: "首页", href: "#hero" },
  { label: "服务", href: "#services" },
  { label: "团队", href: "#team" },
  { label: "案例", href: "#cases" },
  { label: "数据", href: "#stats" },
  { label: "联系", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sectionIds = navItems.map((item) => item.href.slice(1));
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          current = id;
        }
      }
      setActiveSection(`#${current}`);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 backdrop-blur-sm shadow-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-4 lg:px-8">
        <a href="#hero" className="font-display text-xl font-semibold text-gold tracking-wider">
          鼎盛律所
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleClick(item.href)}
                className={`text-sm font-body tracking-wide transition-colors ${
                  activeSection === item.href
                    ? "text-gold"
                    : "text-navy-foreground/70 hover:text-gold"
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-navy-foreground/60 hover:text-gold hover:bg-transparent"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            onClick={() => handleClick("#contact")}
            variant="outline"
            className="border-gold/60 text-gold hover:border-gold hover:bg-transparent transition-all font-body text-sm tracking-wide"
          >
            预约面谈
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-navy-foreground">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-navy border-navy w-64">
            <SheetTitle className="text-gold font-display tracking-wider">鼎盛律所</SheetTitle>
            <ul className="mt-10 flex flex-col gap-6">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => handleClick(item.href)}
                    className={`text-base font-body transition-colors ${
                      activeSection === item.href
                        ? "text-gold"
                        : "text-navy-foreground/70 hover:text-gold"
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={toggle}
                  className="flex items-center gap-2 text-base font-body text-navy-foreground/70 hover:text-gold transition-colors"
                >
                  {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  {dark ? "浅色模式" : "深色模式"}
                </button>
              </li>
              <li>
                <Button
                  onClick={() => handleClick("#contact")}
                  variant="outline"
                  className="w-full border-gold/60 text-gold hover:border-gold hover:bg-transparent font-body"
                >
                  预约面谈
                </Button>
              </li>
            </ul>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
