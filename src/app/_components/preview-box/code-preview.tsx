import { TFormData } from "@/app/types";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import Codeblock from "./Codeblock";

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

const removeDuplicates = (data: any) => [...new Set(data)];

const getSourceCode = (formData: TFormData) => {
  const FormProperties = formData.properties;

  console.log(FormProperties);

  const formImports: Record<
    string,
    {
      component: string;
      primitives: string[];
    }
  > = {
    input: {
      component: "input",
      primitives: ["Input"],
    },
    range: {
      component: "range",
      primitives: ["Range"],
    },
    text_box: {
      component: "text-area",
      primitives: ["Textarea"],
    },
    date_picker: {
      component: "calendar",
      primitives: ["Calendar"],
    },
    dropdown: {
      component: "dropdown",
      primitives: ["DropdownMenu"],
    },
    multiple_choice: {
      component: "radio-group",
      primitives: ["RadioGroup"],
    },
    checkbox: {
      component: "checkbox",
      primitives: ["Checkbox"],
    },
    switch: {
      component: "switch",
      primitives: ["Switch"],
    },
  };

  // imports

  const elementImports = removeDuplicates(
    FormProperties.map((prop) => {
      const element = formImports[prop.type];
      if (prop.type.includes("input")) {
        return `import { Input } from "@/components/ui/input"; \n`;
      } else {
        return `import { ${element.primitives
          .map((primitive) => `${primitive} `)
          .join(", ")} } from "@/components/ui/${element.component}"; \n`;
      }
    })
  ).join("");

  // validations
  const validations = ``;

  return `${elementImports}`;
};

const CodePreview = ({ formData }: TCodePreviewProps) => {
  const sourceCode = getSourceCode(formData);
  return <Codeblock lang="typescript" formCode={sourceCode} />;
};

export default CodePreview;
