"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

const ToggleMode = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Button variant="outline" size="icon" disabled={true}></Button>;
  }

  const isDark = theme === "dark";

  if (isDark) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={() => {
          setTheme("light");
        }}
      >
        <Sun className="hover:cursor-pointer hover:text-primary" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        setTheme("dark");
      }}
    >
      <Moon className="hover:cursor-pointer hover:text-primary" />
    </Button>
  );
};

export default ToggleMode;
