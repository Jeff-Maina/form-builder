import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";

type TEditCompProps = {
  setSheetOpen: (value: boolean) => void;
  deleteField: (id: string) => void;
  children: JSX.Element;
  isSheetOpen: boolean;
  id: string;
};

const EditComp = ({
  setSheetOpen,
  deleteField,
  children,
  id,
  isSheetOpen,
}: TEditCompProps) => {
  return (
    <div
      className={cn(
        "p-4  rounded-md relative group/card transition-all border border-transparent",
        isSheetOpen && "border border-black"
      )}
    >
      {children}
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
          onClick={() => deleteField(id)}
          className="text-neutral-400 hover:text-neutral-800 transition-all"
          variant={"ghost"}
          size={"sm"}
        >
          <Trash size={16} />
        </Button>{" "}
      </div>
    </div>
  );
};

export default EditComp;
