import { TFormData, TProperty, TValidation } from "@/app/types";
import { useEffect, useState } from "react";
import { createHighlighter } from "shiki";
import Codeblock from "./Codeblock";

import { z } from "zod";

const formSchema = z
  .object({
    emailinput: z
      .string()
      .email()
      .max(1000, { message: "maximum length" })
      .includes("jeff", { message: "contains jeff" })
      .endsWith(".com", { message: "ends with .com" }),
  })
  .required({
    emailinput: true,
  });

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
                <Input type='${prop.type.split("_")[0]}' placeholder="${prop.placeholder}" {...field} />
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

  const formatProp = (val: string) => val.toLowerCase().split(" ").join("");

  const getZodValidation = (prop: TProperty) => {
    const dataType = prop.type.includes("number") ? "number()" : "string()";
    let minLength = "";
    let maxLength = "";
    let email = prop.type.includes("email") ? "email()" : "";
    let contains = "";
    let endsWith = "";

    const getValidations = prop.validations?.map((validation) => {
      if (validation.name === "Minimum Length") {
        minLength = `min(${validation.metric}, { message: "${validation.errorMessage}"})`;
      }
      if (validation.name === "Maximum length") {
        maxLength = `max(${validation.metric}, { message: "${validation.errorMessage}"})`;
      }
      if (validation.name === "Contains") {
        contains = `includes("${validation.metric}", { message: "${validation.errorMessage}"})`;
      }
      if (validation.name === "Ends with") {
        endsWith = `endsWith("${validation.metric}", { message: "${validation.errorMessage}" })`;
      }

      return "";
    });

    const validations = [
      dataType,
      email,
      minLength,
      maxLength,
      contains,
      endsWith,
    ].filter(Boolean);

    return `${formatProp(prop.label)}: z.${validations.join(
      "\n        ."
    )}`;
  };

  const validations = FormProperties.map((prop) => getZodValidation(prop));
  const requiredFields = FormProperties.filter((prop) => prop.required);

  const formSchema = `const formSchema = z
  .object({
      ${validations.join(";\n      ")}
  })
  .required({
    ${requiredFields
      .map((field) => `  ${formatProp(field.label)}: true`)
      .join(";\n    ")}
  })`;

  const defaultValues = removeDuplicates(
    FormProperties.filter((prop) => prop.defaultValue !== "").map((prop) => {
      const name = prop.label.toLowerCase().split(" ").join("");
      const defaultValue = prop.type.includes("number")
        ? prop.defaultValue
        : `"${prop.defaultValue}"`;
      return ` ${name}: ${defaultValue}`;
    })
  ).join(";\n      ");

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
    console.log(values); 
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
  const output = `"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
