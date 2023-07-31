import { useDebounceFn } from "ahooks";
import { ChangeEvent, useState } from "react";
import { useSearchRecipe } from "../../../services/Recipe/service";

export const useSearch = () => {
    const [value, setValue] = useState<string>('');
    const {data, isLoading} = useSearchRecipe(value)
  const { run: handleChangeSearch } = useDebounceFn(
    (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    },
    { wait: 500 },
  );

  return {handleChangeSearch, value, data}
}