import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export const useQueryString = () => {
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    ({
      paramsToUpdate,
      reset,
    }: {
      paramsToUpdate: Record<string, string>;
      reset?: boolean;
    }) => {
      const params = reset
        ? new URLSearchParams()
        : new URLSearchParams(searchParams.toString());

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
