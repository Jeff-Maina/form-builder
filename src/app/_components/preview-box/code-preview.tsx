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
  multichoice: {
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

const FormFields = {};
const getSourceCode = (formData: TFormData) => {
  const FormProperties = formData.properties;

  // Helper: Remove duplicate imports
  const elementImports = removeDuplicates(
    FormProperties.map((prop) => {
      const element = formImports[prop.type];
      if (prop.type === "linebreak") return "";

      if (prop.type.includes("input")) {
        return `
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
`;
      } else {
        const primitives = element.primitives.join(", ");
        return `import { ${primitives} } from "@/components/ui/${element.component}";`;
      }
    })
  )
    .filter(Boolean)
    .join("\n");

  const generateFormFields = () =>
    FormProperties.map((prop) => {
      const name = prop.label.toLowerCase().split(" ").join("");

      return `
        <FormField
          control={form.control}
          name="${name}"
          render={({ field }) => (
            <FormItem>
             ${prop.isLabelHidden ? "" : `<FormLabel>${prop.label}</FormLabel>`}
              <FormControl>
                <Input placeholder="${prop.placeholder}" {...field} />
              </FormControl>
            ${
              prop.isDescriptionHidden
                ? ""
                  : `  <FormDescription>
                ${prop.description}
              </FormDescription>`
            }
              <FormMessage />
            </FormItem>
          )}
        />`;
    })
      .join("")
      .trim();

  const defaultValues = removeDuplicates(
    FormProperties.filter((prop) => prop.defaultValue !== "")
      .map((prop) => {
        const name = prop.label.toLowerCase().split(" ").join("");
        const defaultValue = prop.type.includes("number") ? prop.defaultValue : `"${prop.defaultValue}"`
        return ` ${name}: ${defaultValue}`;
      })
      
  );

  const formSchema = `
const formSchema = z.object({});
`;

  // Form component template
  const component = `
export function Form() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ${defaultValues}
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values); // Replace with your logic
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        ${generateFormFields()}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
`;

  // Final output with proper formatting
  const output = `
${elementImports}
${formSchema}
${component}
`;

  return output.trim(); // Remove extra spaces from the beginning and end
};

const CodePreview = ({ formData }: TCodePreviewProps) => {
  const sourceCode = getSourceCode(formData);
  return <Codeblock lang="typescript" formCode={sourceCode} />;
};

export default CodePreview;
