"use client";

import { TFormData } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type TJsonPreview = {
  formData: TFormData;
};

const JSONPreview = ({ formData }: TJsonPreview) => {
  return (
    <ScrollArea className="max-h-[90vh] flex flex-col p-4  border bg-white rounded-md overflow-x-auto">
      <pre className="whitespace-pre-wrap font-mono text-sm ">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </ScrollArea>
  );
};

export default JSONPreview;
