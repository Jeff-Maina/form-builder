"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Check, Code, Eye, RotateCcw, Scan, Trash } from "lucide-react";
import TooltipWrapper from "./tooltip-wrapper";
import ResetModal from "./modals/reset-modal";
import PreviewForm from "./modals/preview-form-modal";
import ViewCodeModal from "./modals/view-code-modal";
import TextInput from "./elements/text-input/text-input";
import { TProperty } from "../types";
import { ElementsObj, elements } from "../data/Elements";

type TEditboxProps = {
  properties: TProperty[];
  setRequired: (value: string) => void;
};

const Editbox = ({ properties, setRequired }: TEditboxProps) => {
  // * action states
  const [isPreviewingForm, setPreviewForm] = React.useState(false);
  const [isViewingCode, setViewingCode] = React.useState(false);
  const [isResetingForm, setResetingForm] = React.useState(false);
  const [isComplete, setComplete] = React.useState(false);

  return (
    <>
      <div className="w-full h-full pt-10 flex flex-col bg-white">
        <nav className="w-full h-10 mb-3 flex justify-end">
          <div className="flex items-center gap-1.5">
            <TooltipWrapper label="Reset form">
              <Button
                size={"sm"}
                variant="destructive"
                className="gap-2 font-medium flex"
                onClick={() => setResetingForm(true)}
              >
                <Trash size={16} />
              </Button>
            </TooltipWrapper>
            <Button
              size={"sm"}
              onClick={() => setPreviewForm(true)}
              variant={"outline"}
              className="gap-3 flex"
            >
              <Eye size={16} />
              Preview form
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => setViewingCode(true)}
              className="gap-2 font-medium flex"
            >
              <Code size={16} />
              View code
            </Button>{" "}
            <Button size={"sm"} className="gap-2 font-medium flex">
              <Check size={16} />
              Complete form
            </Button>
          </div>
        </nav>
        {/* container */}
        <div className="w-full h-full border rounded-lg p-3">
          {properties.map((item, index) => {
            const Component = ElementsObj[item.type]; // Dynamically access the component
            return Component ? <Component key={index} {...item} /> : null; // Render the component with props
          })}
        </div>
        ;
      </div>
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

export default Editbox;
