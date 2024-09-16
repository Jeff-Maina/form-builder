import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import * as Sheet from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import * as Tabs from "@/components/ui/tabs";

import { Edit, Trash } from "lucide-react";
import React from "react";
import ModelTab from "./model-tab";
import DesignTab from "./design-tab";

type TSheetProps = {
  isSheetOpen: boolean;
  setSheetOpen: (value: boolean) => void;
};

const TextInputSheet = ({ isSheetOpen, setSheetOpen }: TSheetProps) => {
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

const TextInput = () => {
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  return (
    <>
      <div className="p-4 border border-dashed hover:border-neutral-500 rounded-md !cursor-pointer relative group/card transition-all">
        <div className="grid w-full max-w-sm items-center gap-2 relative">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="Email" />
        </div>
        <div className="absolute bottom-0 right-0 p-2 flex items-center opacity-0 transition-all group-hover/card:opacity-100 ">
          <Button
            className="text-neutral-400 hover:text-neutral-800 transition-all"
            variant={"ghost"}
            size={"sm"}
            onClick={() => setSheetOpen(true)}
          >
            <Edit size={16} />
          </Button>
          <Button
            className="text-neutral-400 hover:text-neutral-800 transition-all"
            variant={"ghost"}
            size={"sm"}
          >
            <Trash size={16} />
          </Button>{" "}
        </div>
      </div>
      <TextInputSheet isSheetOpen={isSheetOpen} setSheetOpen={setSheetOpen} />
    </>
  );
};

export default TextInput;
