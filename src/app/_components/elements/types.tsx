import { TProperty } from "@/app/types";

type TCompProps = {
  item: TProperty;
  deleteField: (value: string) => void;
  setProperties: any
};

export type { TCompProps };
