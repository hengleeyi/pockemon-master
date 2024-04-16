import { headers } from "next/headers";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const headersList = headers();
  const searchParams = headersList.get("x-search-params");
  const queryString = searchParams?.split("&");
  const params: Record<string, string> | undefined = queryString?.reduce(
    (acc, item) => {
      const [key, value] = item.split("=");
      return { ...acc, [key]: value };
    },
    {}
  );

  const capitalName = params?.pokemonName
    ? params?.pokemonName.charAt(0).toUpperCase() + params?.pokemonName.slice(1)
    : "";
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">{capitalName}</h1>
      {children}
    </div>
  );
};

export default Layout;
