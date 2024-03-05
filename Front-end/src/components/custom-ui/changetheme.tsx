"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
type Theme = "dark" | "light" | "system";

const getSystemPreference = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};
const ChangeThemeButton = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const htmlElement = document.documentElement;

    if (theme === "system") {
      setTheme(getSystemPreference());
    } else {
      htmlElement.classList.remove("light", "dark");
      htmlElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <div className="container">
      <h3 className="text-center capitalize dark">
        Dark theme and Light theme
      </h3>
      <div className="flex gap-2 justify-center">
        <Button onClick={() => setTheme("light")}>Light</Button>
        <Button onClick={() => setTheme("dark")}>Dark</Button>
        <Button onClick={() => setTheme("system")}>System</Button>
      </div>
    </div>
  );
};

export default ChangeThemeButton;
