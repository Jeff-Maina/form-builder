"use client";

import EditComp from "../../edit_comp/edit_comp";

import * as React from "react";
import { TCompProps } from "../types";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TextboxComp = ({ item, deleteField }: TCompProps) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  return (
    <EditComp
      deleteField={deleteField}
      id={item.id}
      isSheetOpen={isSheetOpen}
      setSheetOpen={setSheetOpen}
    >
      <div className="grid w-full max-w-sm items-center gap-2 relative">
        <Label className="text-neutral-600">
          {item.label}
          {item.required ? <span className="text-red-500">*</span> : null}
        </Label>
        <Textarea placeholder={item.placeholder} />
      </div>
    </EditComp>
  );
};

export default TextboxComp;
