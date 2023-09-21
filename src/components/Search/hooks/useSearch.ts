import { useDebounceFn } from "ahooks";
import { ChangeEvent, useState } from "react";
import { useSearchRecipe } from "../../../services/Recipe/service";

export const useSearch = () => {
  const [value, setValue] = useState<string>("");
  const { data } = useSearchRecipe(value);
  const { run: handleChangeSearch } = useDebounceFn(
    (event: ChangeEvent<HTMLInputElement>) => {
      const validateData = event.target.value.replace(/\s+/g, " ").trim();
      setValue(validateData);
    },
    { wait: 500 }
  );

  return { handleChangeSearch, value, data };
};
