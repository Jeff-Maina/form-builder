// Input elements
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Form elements
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

// Menu elements
import * as DropdownMenu from "@/components/ui/dropdown-menu";
import { CaretSortIcon } from "@radix-ui/react-icons";

// Collapsible elements
import * as Collapsible from "@/components/ui/collapsible";

const ModelTab = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <h1 className="mt-5 mb-4 font-semibold">Field properties</h1>
        <div className="p-3 border rounded-md flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Hide label</p>
            <p className="text-xs text-neutral-600">Hide the fields input.</p>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <Switch id="required" />
            </div>
          </div>
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="field_label">
            Field label
          </Label>
          <Input type="text" id="field_label" placeholder="Field Label" />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="placeholder">
            Placeholder
          </Label>
          <Input type="text" id="placeholder" placeholder="Placeholder" />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="field_label">
            Default value
          </Label>
          <Input type="text" id="field_label" placeholder="Defualt value" />
        </div>
      </div>
      <div>
        <h1 className="mt-10 mb-7 font-semibold">Validation</h1>
        <div className="w-full flex flex-col gap-4">
          {/* required button */}
          <div className="grid gap-2">
            <div className="p-3 border rounded-md flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Field is required</p>
                <p className="text-xs text-neutral-600">
                  {" "}
                  Input has to be entered for one to submit form.
                </p>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <Switch id="required" />
                </div>
              </div>
            </div>
            <div>
              <Collapsible.Collapsible>
                <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
                  Required error message
                  <CaretSortIcon />
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="pt-2">
                  <Textarea placeholder="Enter required error message" />
                </Collapsible.CollapsibleContent>
              </Collapsible.Collapsible>
            </div>
          </div>
          {/* validations */}
          <div className="grid w-full items-center gap-2 relative">
            <Label className="text-neutral-600" htmlFor="max">
              Maximum length
            </Label>
            <Input type="text" id="max" placeholder="Max length" />
            <div>
              <Collapsible.Collapsible>
                <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
                  Maxlength error message
                  <CaretSortIcon />
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="pt-2">
                  <Textarea placeholder="Enter maxlength error message" />
                </Collapsible.CollapsibleContent>
              </Collapsible.Collapsible>
            </div>
          </div>
          <div className="grid w-full items-center gap-2 relative">
            <Label className="text-neutral-600" htmlFor="max">
              Minimum length
            </Label>
            <Input type="text" id="min" placeholder="Min length" />
            <div>
              <Collapsible.Collapsible>
                <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
                  Minlength error message
                  <CaretSortIcon />
                </Collapsible.CollapsibleTrigger>
                <Collapsible.CollapsibleContent className="pt-2">
                  <Textarea placeholder="Enter minlength error message" />
                </Collapsible.CollapsibleContent>
              </Collapsible.Collapsible>
            </div>
          </div>

          {/* Advanced validations */}

          <h1 className="font-semibold">Advanced validations</h1>

          <div className="flex flex-col gap-4">
            <div className="grid gap-3 p-3 border rounded-md">
              <div className="grid w-full items-center gap-2 relative">
                <Label className="text-neutral-600" htmlFor="max">
                  Starts with
                </Label>
                <Input type="text" id="min" placeholder="Starts with" />
              </div>
              <div>
                <Collapsible.Collapsible>
                  <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
                    Starts with error message
                    <CaretSortIcon />
                  </Collapsible.CollapsibleTrigger>
                  <Collapsible.CollapsibleContent className="pt-2">
                    <Textarea placeholder="Enter minlength error message" />
                  </Collapsible.CollapsibleContent>
                </Collapsible.Collapsible>
              </div>
            </div>
            <div className="grid gap-3 p-3 border rounded-md">
              <div className="grid w-full items-center gap-2 relative">
                <Label className="text-neutral-600" htmlFor="max">
                  Ends with
                </Label>
                <Input type="text" id="min" placeholder="Ends with" />
              </div>
              <div>
                <Collapsible.Collapsible>
                  <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
                    Ends with error message
                    <CaretSortIcon />
                  </Collapsible.CollapsibleTrigger>
                  <Collapsible.CollapsibleContent className="pt-2">
                    <Textarea placeholder="Enter ends with error message" />
                  </Collapsible.CollapsibleContent>
                </Collapsible.Collapsible>
              </div>
            </div>
            <div className="grid gap-3 p-3 border rounded-md">
              <div className="grid w-full items-center gap-2 relative">
                <Label className="text-neutral-600" htmlFor="max">
                  Contains
                </Label>
                <Input type="text" id="min" placeholder="Contains" />
              </div>
              <div>
                <Collapsible.Collapsible>
                  <Collapsible.CollapsibleTrigger className="text-xs text-red-500 font-medium flex items-center gap-3">
                    Contains error message
                    <CaretSortIcon />
                  </Collapsible.CollapsibleTrigger>
                  <Collapsible.CollapsibleContent className="pt-2">
                    <Textarea placeholder="Enter contains error message" />
                  </Collapsible.CollapsibleContent>
                </Collapsible.Collapsible>
              </div>
            </div>
          </div>

          <DropdownMenu.DropdownMenu>
            <DropdownMenu.DropdownMenuTrigger asChild>
              <button className="p-2 border border-neutral-300 hover:border-black transition-all duration-100 rounded text-sm border-dashed">
                Add validation
              </button>
            </DropdownMenu.DropdownMenuTrigger>
            <DropdownMenu.DropdownMenuContent
              side="bottom"
              align="center"
              className="w-[430px]"
            >
              <DropdownMenu.DropdownMenuItem className="cursor-pointer hover:bg-neutral-200">
                Ends with
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem className="cursor-pointer hover:bg-neutral-200">
                Starts with
              </DropdownMenu.DropdownMenuItem>
              <DropdownMenu.DropdownMenuItem className="cursor-pointer hover:bg-neutral-200">
                Contains
              </DropdownMenu.DropdownMenuItem>
            </DropdownMenu.DropdownMenuContent>
          </DropdownMenu.DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default ModelTab;
