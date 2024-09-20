"use client";

import { elements } from "../data/Elements";
import { TProperty } from "../types";
import { v4 as uuidv4 } from "uuid";
import * as React from "react";
import ResetModal from "./modals/reset-modal";
import PreviewForm from "./modals/preview-form-modal";
import ViewCodeModal from "./modals/view-code-modal";
import { Check, Code, Eye, FormInput, RotateCcw } from "lucide-react";

import * as Dropdown from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import TooltipWrapper from "./tooltip-wrapper";

type TSidebarProps = {
  addProperty: (value: TProperty) => void;
};

const Sidebar = ({ addProperty }: TSidebarProps) => {
  const addNewProperty = (value: string, label: string) => {
    const propObj = {
      id: uuidv4(),
      type: value,
      label,
      isLabelHidden: false,
      disabled: false,
      placeholder: "Placeholder",
      required: true,
    };
    addProperty(propObj);
  };

  // actions modals

  const [isPreviewingForm, setPreviewForm] = React.useState(false);
  const [isViewingCode, setViewingCode] = React.useState(false);
  const [isResetingForm, setResetingForm] = React.useState(false);
  const [isComplete, setComplete] = React.useState(false);

  return (
    <>
      <aside className="w-full h-full rounded-md pt-10 ">
        <div className="sticky top-14">
          <div className="flex flex-col gap-1">
            <h1 className="font-medium mb-7">Elements</h1>
            {elements.map((element, index) => {
              return (
                <button
                  key={index}
                  onClick={() => {
                    addNewProperty(element.type, element.label);
                  }}
                  className="text-sm flex p-2 pl-4 border w-full rounded items-center gap-4 bg-white  font-medium text-neutral-600  hover:bg-black hover:border-black  hover:text-white transition-all duration-100"
                >
                  {element.icon}
                  {element.label}
                </button>
              );
            })}
          </div>
          <div className="mt-3">
            <div className="w-full h-9 grid grid-cols-5 gap-1 text-sm">
              <TooltipWrapper label="Reset form" side="bottom">
                <Button
                  variant={"outline"}
                  className="w-full bg-white col-span-1 rounded-md  h-full border grid place-items-center"
                >
                  <RotateCcw size={18} />
                </Button>
              </TooltipWrapper>
              <Dropdown.DropdownMenu>
                <Dropdown.DropdownMenuTrigger asChild>
                  <Button
                    variant={"secondary"}
                    className="w-full flex gap-2  col-span-2 rounded-md  h-full border"
                  >
                    Preview
                    <Eye size={16} />
                  </Button>
                </Dropdown.DropdownMenuTrigger>
                <Dropdown.DropdownMenuContent className="shadow-md">
                  <Dropdown.DropdownMenuItem
                    onClick={() => setPreviewForm(true)}
                    className="flex items-center gap-3 !cursor-pointer"
                  >
                    <FormInput size={16} />
                    Form
                  </Dropdown.DropdownMenuItem>
                  <Dropdown.DropdownMenuItem
                    onClick={() => setViewingCode(true)}
                    className="flex items-center gap-3 !cursor-pointer"
                  >
                    <Code size={16} />
                    Code
                  </Dropdown.DropdownMenuItem>
                </Dropdown.DropdownMenuContent>
              </Dropdown.DropdownMenu>

              <TooltipWrapper label="Complete form" side="bottom">
                <Button
                  variant={"secondary"}
                  className="w-full col-span-2 flex gap-2 rounded-md  h-full border"
                >
                  Done
                  <Check size={16} />
                </Button>
              </TooltipWrapper>
            </div>
          </div>
        </div>
      </aside>
      <ResetModal
        isResetingForm={isResetingForm}
        setResetingForm={setResetingForm}
      />
      <PreviewForm
        isPreviewingForm={isPreviewingForm}
        setPreviewForm={setPreviewForm}
      />
      <ViewCodeModal
        isViewingCode={isViewingCode}
        setViewCode={setViewingCode}
      />
    </>
  );
};

export default Sidebar;
