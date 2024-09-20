"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";

const TextboxComp = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      setSheetOpen={setSheetOpen}
    >
      <div>TextboxComp</div>
    </EditComp>
  );
};

export default TextboxComp;
