import { useSearchParams } from "next/navigation";
import React, { useCallback } from "react";

const useQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (paramsToUpdate: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(paramsToUpdate).forEach(([name, value]) => {
        params.set(name, value);
      });

      return params.toString();
    },
    [searchParams]
  );

  return { searchParams, createQueryString };
};

export default useQueryString;
