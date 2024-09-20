"use client";

import { elements } from "../data/Elements";
import { TProperty } from "../types";

type TSidebarProps = {
  addProperty: (value: TProperty) => void;
};

const Sidebar = ({ addProperty }: TSidebarProps) => {
  const addNewProperty = (value: string) => {
    const propObj = {
      type: value,
      label: "Change label",
      isLabelHidden: false,
      disabled: false,
      required: true,
    };
    addProperty(propObj);
  };

  return (
    <aside className="w-full h-full rounded-md pt-10">
      <h1 className="font-medium mb-7">Elements</h1>
      <div className="flex flex-col gap-1">
        {elements.map((element, index) => {
          return (
            <button
              key={index}
              onClick={() => {
                
                addNewProperty(element.type);
              }}
              className="text-sm flex p-2 pl-4 border w-full rounded items-center gap-4 bg-white  font-medium text-neutral-600  hover:bg-black hover:border-black  hover:text-white transition-all duration-100"
            >
              {element.icon}
              {element.label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
