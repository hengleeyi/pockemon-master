// 'use client'
import { headers } from "next/headers";
// import { usePathname } from "next/navigation";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const pathname = usePathname();
  // console.log("🚀 ~ Layout ~ pathname:", pathname)

  const headersList = headers();
  const path = headersList.get("x-pathname");
  const typeName = path?.split("/")[2];
  const capitalName = typeName
    ? typeName.charAt(0).toUpperCase() + typeName.slice(1)
    : "";
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{capitalName}</h1>
      {children}
    </div>
  );
};

export default Layout;
