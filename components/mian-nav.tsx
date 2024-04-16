import Link from "next/link";
import React from "react";
import ToggleMode from "./toggle-mode";

const MainNav = () => {
  return (
    <nav className="flex justify-between sticky top-0 p-4 bg-white dark:bg-black">
      <div className="flex gap-2 items-center">
        <Link href="/">Home</Link>
      </div>
      <div className="flex gap-2 items-center">
        <ToggleMode />
      </div>
    </nav>
  );
};

export default MainNav;
