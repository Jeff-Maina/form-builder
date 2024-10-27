import { TFormData } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type TJsonPreview = {
  formData: TFormData;
};

const JSONPreview = ({ formData }: { formData: TFormData }) => {
  return (
    <ScrollArea className="max-h-[90vh] flex flex-col overflow-x-auto">
      <pre className="whitespace-pre-wrap font-mono ">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </ScrollArea>
  );
};

export default JSONPreview;
