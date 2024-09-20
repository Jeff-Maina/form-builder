"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";

const DropdownComp = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      setSheetOpen={setSheetOpen}
    >
      <div>DropdownComp</div>
    </EditComp>
  );
};

export default DropdownComp;
