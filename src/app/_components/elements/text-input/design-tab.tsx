import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const DesignTab = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col gap-4">
        <h1 className="mt-5 mb-4 font-semibold">Field properties</h1>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Label font size
          </Label>
          <Input type="number" id="font-size" placeholder="Label font size" />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Label color
          </Label>
          <Input
            type="color"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Field text font size
          </Label>
          <Input
            type="number"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Field text color
          </Label>
          <Input
            type="color"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
        <div className="grid w-full items-center gap-2 relative">
          <Label className="text-neutral-600" htmlFor="font-size">
            Border radius
          </Label>
          <Input
            type="number"
            id="font-size"
            className="rounded"
            placeholder="Label font size"
          />
        </div>
      </div>
    </div>
  );
};

export default DesignTab;
