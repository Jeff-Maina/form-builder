"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";

const DatePicker = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      setSheetOpen={setSheetOpen}
    >
      <div>DatePicker</div>
    </EditComp>
  );
};

export default DatePicker;
