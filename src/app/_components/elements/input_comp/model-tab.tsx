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
import { TProperty } from "@/app/types";
import { TFieldFunctions } from "./type";

type TModelProps = {
  inputType: string;
  FieldFunctions: TFieldFunctions;
  FieldProperties: TProperty;
};

const ModelTab = ({ FieldFunctions, FieldProperties }: TModelProps) => {
  const {
    setHideLabel,
    setHidePlaceholder,
    setHideDescription,
    setLabel,
    setDefaultValue,
    setDescription,
    setPlaceholder,
    setIsRequired,
    setIsDisabled,
  } = FieldFunctions;
  const {
    isLabelHidden,
    isPlaceholderHidden,
    isDescriptionHidden,
    label,
    description,
    defaultValue,
    placeholder,
    required,
    disabled,
  } = FieldProperties;
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        {/* property switches */}
        <div className="flex flex-col gap-2">
          <div className="p-3 border rounded-md flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Hide label</p>
              <p className="text-xs text-neutral-600">
                Hide the field's label.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isLabelHidden}
                  onCheckedChange={() => {
                    setHideLabel();
                  }}
                  id="required"
                />
              </div>
            </div>
          </div>

          <div className="p-3 border rounded-md flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Hide description message</p>
              <p className="text-xs text-neutral-600">
                Hide the field's description message.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isDescriptionHidden}
                  onCheckedChange={() => {
                    setHideDescription();
                  }}
                  id="required"
                />
              </div>
            </div>
          </div>
          <div className="p-3 border rounded-md flex items-center justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Disable input</p>
              <p className="text-xs text-neutral-600">
                Disable the field and make it inaccessible.
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={disabled}
                  onCheckedChange={() => {
                    setIsDisabled();
                  }}
                  id="required"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex flex-col gap-4">
          {!FieldProperties.isLabelHidden && (
            <div className="grid w-full items-center gap-2 relative">
              <Label className="text-neutral-600" htmlFor="field_label">
                Field label
              </Label>
              <Input
                type="text"
                id="field_label"
                placeholder="Field Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </div>
          )}
          <div className="grid w-full items-center gap-2 relative">
            <Label className="text-neutral-600" htmlFor="placeholder">
              Placeholder
            </Label>
            <Input
              type="text"
              id="placeholder"
              placeholder="Placeholder"
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
            />
          </div>
          <div className="grid w-full items-center gap-2 relative">
            <Label className="text-neutral-600" htmlFor="field_label">
              Default value
            </Label>
            <Input
              type="text"
              id="field_label"
              placeholder="Default value"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            />
          </div>
          {!isDescriptionHidden && (
            <div className="grid w-full items-center gap-2 relative">
              <Label className="text-neutral-600" htmlFor="field_label">
                Description
              </Label>
              <Textarea
                id="field_label"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <h1 className="mt-10 mb-5 font-semibold">Validation</h1>
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
                  <Switch
                    checked={FieldProperties.required}
                    onCheckedChange={() => FieldFunctions.setIsRequired()}
                    id="required"
                  />
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
