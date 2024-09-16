import { Button } from "@/components/ui/button";
import { Check, Code, Eye, RotateCcw, Scan } from "lucide-react";

const Editbox = () => {
  return (
    <div className="w-full h-full pt-10 flex flex-col">
      <nav className="w-full h-10 mb-3 flex justify-between">
        <div className="flex items-center gap-1.5">
          <Button size={"sm"} className="gap-3 flex">
            <Eye size={16} />
            Preview form
          </Button>
          <Button size={"sm"} className="gap-2 font-medium flex">
            <Code size={16} />
            View code
          </Button>{" "}
          <Button size={"sm"} className="gap-2 font-medium flex">
            <Check size={16} />
            Complete form
          </Button>
        </div>
        <Button size={"sm"} variant="destructive" className="gap-2 font-medium flex">
          <RotateCcw size={16} />
          Reset
        </Button>
      </nav>
      <div className="w-full h-full border"></div>;
    </div>
  );
};

export default Editbox;
