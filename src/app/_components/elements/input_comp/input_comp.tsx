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

type TSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
};

const InputCompSheet = ({ isSheetOpen, setSheetOpen }: TSheetProps) => {
  return (
    <Sheet.Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <Sheet.SheetContent className="border-none p-6 shadow-none !max-w-lg">
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
              <Tabs.TabsContent value="model">
                <ModelTab />
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

  return (
    <>
      <EditComp
        deleteField={deleteField}
        id={item.id}
        setSheetOpen={setSheetOpen}
      >
        <div className="grid w-full max-w-sm items-center gap-2 relative">
          <Label htmlFor="input">
            {item.label}{" "}
            {item.required ? <span className="text-red-500">*</span> : null}
          </Label>
          <Input type={inputType} id="input" placeholder={item.placeholder} />
        </div>
      </EditComp>

      <InputCompSheet isSheetOpen={isSheetOpen} setSheetOpen={setSheetOpen} />
    </>
  );
};

export default InputComp;
