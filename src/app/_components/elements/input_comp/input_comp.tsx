import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Sheet from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Tabs from "@/components/ui/tabs";

import { Edit, Trash } from "lucide-react";
import * as React from "react";
import ModelTab from "./model-tab";
import DesignTab from "./design-tab";
import { TCompProps } from "../types";
import EditComp from "../../edit_comp/edit_comp";
import { TProperty } from "@/app/types";

type TSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
  item: TCompProps["item"];
  inputType: string;
  FieldFunctions: {
    setHideLabel: () => void;
    setHidePlaceholder: () => void;
    setHideDescription: () => void;
    setLabel: (value: string) => void;
    setDefaultValue: (value: string | number | undefined) => void;
    setDescription: (value: string) => void;
    setPlaceholder: (value: string) => void;
    setIsRequired: () => void;
    setIsDisabled: () => void;
  };
  FieldProperties: TProperty;
};

const InputCompSheet = ({
  isSheetOpen,
  setSheetOpen,
  item,
  inputType,
  FieldFunctions,
  FieldProperties,
}: TSheetProps) => {
  return (
    <Sheet.Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <Sheet.SheetContent className="border-none p-6 shadow-none !max-w-lg">
        <Sheet.SheetTitle></Sheet.SheetTitle>
        <ScrollArea className="w-full max-h-full h-full rounded-lg overflow-hidden">
          <div className="w-full h-full bg-white p-4 rounded-lg overflow-hidden">
            {/* ACTUAL TABS */}

            <Tabs.Tabs defaultValue="model" className="w-full">
              <Tabs.TabsList className="w-full bg-white gap-3">
                <Tabs.TabsTrigger
                  className="w-2/4 !py-2 data-[state=active]:bg-neutral-200 hover:bg-neutral-100 transition-all shadow-none !text-neutral-800"
                  value="model"
                >
                  Model
                </Tabs.TabsTrigger>
                <Tabs.TabsTrigger
                  className="w-2/4 !py-2 data-[state=active]:bg-neutral-200 hover:bg-neutral-100 transition-all shadow-none !text-neutral-800"
                  value="design"
                >
                  Design
                </Tabs.TabsTrigger>
              </Tabs.TabsList>

              <div className="w-full p-4 border-neutral-400 h-[140px]  border rounded-md my-4">
                <div className="h-full flex flex-col w-full max-w-sm justify-center gap-2 relative">
                  {!FieldProperties.isLabelHidden ? (
                    <Label htmlFor="input">
                      {FieldProperties.label}
                      {FieldProperties.required ? (
                        <span className="text-red-500 ml-1">*</span>
                      ) : null}
                    </Label>
                  ) : null}
                  <div className="grid gap-1">
                    <Input
                      disabled={FieldProperties.disabled}
                      type={inputType}
                      id="input"
                      placeholder={FieldProperties.placeholder}
                    />
                    {!FieldProperties.isDescriptionHidden ? (
                      <small className="text-muted-foreground">
                        {FieldProperties.description}
                      </small>
                    ) : null}
                    <small className="text-red-600">
                      This is an error message
                    </small>
                  </div>
                </div>
              </div>

              <Tabs.TabsContent value="model">
                <ModelTab
                  inputType={inputType}
                  FieldFunctions={FieldFunctions}
                  FieldProperties={FieldProperties}
                />
              </Tabs.TabsContent>
              <Tabs.TabsContent value="design">
                <DesignTab />
              </Tabs.TabsContent>
            </Tabs.Tabs>

            <Sheet.SheetFooter className="mt-4">
              <Button className="w-full">Complete</Button>
            </Sheet.SheetFooter>
          </div>
        </ScrollArea>
      </Sheet.SheetContent>
    </Sheet.Sheet>
  );
};

const InputComp = ({
  item,
  deleteField,
  inputType,
}: TCompProps & { inputType: string }) => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);

  // states;
  const [isLabelHidden, setHideLabel] = React.useState(item.isLabelHidden);
  const [isPlaceholderHidden, setHidePlaceholder] = React.useState(
    item.isPlaceholderHidden
  );
  const [isDescriptionHidden, setHideDescription] = React.useState(
    item.isDescriptionHidden
  );
  const [label, setLabel] = React.useState(item.label);
  const [description, setDescription] = React.useState(item.description);
  const [defaultValue, setDefaultValue] = React.useState(item.defaultValue);
  const [placeholder, setPlaceholder] = React.useState(item.placeholder);
  const [isRequired, setIsRequired] = React.useState(item.required);
  const [isDisabled, setIsDisabled] = React.useState(item.disabled);

  const FieldProperties = {
    id: item.id,
    type: item.type,
    disabled: isDisabled,
    label,
    description,
    defaultValue,
    placeholder,
    required: isRequired,
    isDescriptionHidden,
    isPlaceholderHidden,
    isLabelHidden,
  };

  const FieldFunctions = {
    setHideLabel: () => setHideLabel(!isLabelHidden),
    setHidePlaceholder: () => setHidePlaceholder(!isPlaceholderHidden),
    setHideDescription: () => setHideDescription(!isDescriptionHidden),
    setLabel,
    setDefaultValue,
    setDescription,
    setPlaceholder,
    setIsRequired: () => setIsRequired(!isRequired),
    setIsDisabled: () => setIsDisabled(!isDisabled),
  };

  return (
    <>
      <EditComp
        deleteField={deleteField}
        id={item.id}
        setSheetOpen={setSheetOpen}
      >
        <div className="grid w-full max-w-sm items-center gap-2 relative">
          <Label htmlFor="input">
            {label}{" "}
            {isRequired ? <span className="text-red-500">*</span> : null}
          </Label>
          <div className="grid gap-1">
            <Input type={inputType} id="input" placeholder={placeholder} />
            <small className="text-muted-foreground">{description}</small>
          </div>
        </div>
      </EditComp>

      <InputCompSheet
        item={item}
        inputType={inputType}
        isSheetOpen={isSheetOpen}
        setSheetOpen={setSheetOpen}
        FieldProperties={FieldProperties}
        FieldFunctions={FieldFunctions}
      />
    </>
  );
};

export default InputComp;
