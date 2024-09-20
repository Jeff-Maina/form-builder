"use client";
import * as React from "react";

import { TProperty } from "../types";
import { ElementsObj } from "../data/Elements";

type TEditboxProps = {
  properties: TProperty[];
  setRequired: (value: string) => void;
  deleteField: (id: string) => void;
};

const Editbox = ({ properties, setRequired, deleteField }: TEditboxProps) => {
  return (
    <div className="w-full h-full pt-10 flex flex-col bg-white">
      {/* container */}
      <div className="w-full h-full border rounded-lg p-3 flex flex-col gap-3">
        {properties.map((item, index) => {
          const Component = ElementsObj[item.type]; // Dynamically access the component
          return Component ? (
            <Component key={index} {...item} deleteProperty={deleteField} />
          ) : null; // Render the component with props
        })}
      </div>
    </div>
  );
};

export default Editbox;
