import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JSONPreview from "./json-preview";
import { TFormData } from "@/app/types";

type TPreviewProps = {
  formData: TFormData;
};
const Previewbox = ({ formData }: TPreviewProps) => {
  return (
    <div className="h-full w-full">
      <Tabs defaultValue="account" className="w-full">
        <TabsList className="w- grid grid-cols-3">
          <TabsTrigger
            className="data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
            value="preview"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
            value="json"
          >
            JSON
          </TabsTrigger>
          <TabsTrigger
            className="data-[state=active]:bg-white hover:bg-neutral-100 transition-all !text-neutral-800"
            value="code"
          >
            code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview"></TabsContent>
        <TabsContent value="json" className="w-full h-full">
          <JSONPreview formData={formData} />
        </TabsContent>
        <TabsContent value="code">code.</TabsContent>
      </Tabs>
    </div>
  );
};

export default Previewbox;
