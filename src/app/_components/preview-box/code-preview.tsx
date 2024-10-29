import { TFormData } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";

type TCodePreviewProps = {
  formData: TFormData;
};

const formCode = `
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import JSONPreview from "./json-preview";
import { TFormData } from "@/app/types";
import FormPreview from "./form-preview";
import CodePreview from "./code-preview";

type TPreviewProps = {
  formData: TFormData;
  children: React.ReactNode;
};
const Previewbox = ({ formData, children }: TPreviewProps) => {
  return (
    <div className="h-full w-full">
      <Tabs defaultValue="preview" className="w-full">
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
        <TabsContent value="preview">{children}</TabsContent>
        <TabsContent value="json" className="w-full h-full">
          <JSONPreview formData={formData} />
        </TabsContent>
        <TabsContent value="code">
          <CodePreview formData={formData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Previewbox;

`;

const CodePreview = ({ formData }: TCodePreviewProps) => {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null);

  useEffect(() => {
    const loadHighlighter = async () => {
      const highlighter = await createHighlighter({
        themes: ["vitesse-dark"],
        langs: ["typescript"],
      });

      const code = highlighter.codeToHtml(formCode, {
        theme: "vitesse-dark",
        lang: "typescript",
      });

      setHighlightedCode(code);
    };

    loadHighlighter();
  }, []);

  if (!highlightedCode) return <p>Loading...</p>; // Optional: Add a loading state

  return (
    <div
      className="w-full h-full overflow-auto p-4 border rounded-md"
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  );
};

export default CodePreview;
