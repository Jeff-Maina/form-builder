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
                <Input type='${prop.type.split("_")[0]}' placeholder="${
        prop.placeholder
      }" {...field} />
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
    let isNumberType = prop.type.includes("number");
    const validations: string[] = [];

    validations.push(isNumberType ? "z.coerce.number()" : "z.string()");

    if (prop.type.includes("email")) {
      validations.push("email()");
    }
    
    if (prop.type.includes("url")) {
      validations.push("url()");
    }

    prop.validations?.forEach(
      ({ name, metric, errorMessage = "Invalid input" }) => {
        const messageOption = errorMessage
          ? `, { message: "${errorMessage.trim()}" }`
          : "";

        switch (name) {
          case "Minimum length":
            validations.push(`min(${metric}${messageOption})`);
            break;
          case "Maximum length":
            validations.push(`max(${metric}${messageOption})`);
            break;
          case "Contains":
            validations.push(`includes("${metric}"${messageOption})`);
            break;
          case "Ends with":
            validations.push(`endsWith("${metric}"${messageOption})`);
            break;
          case "Length":
            validations.push(`length(${metric}${messageOption})`);
            break;
          case "Regex":
            validations.push(`regex(new RegExp("${metric}")${messageOption})`);
            break;
          case "Greater than":
            validations.push(`gt(${metric}${messageOption})`);
            break;
          case "Greater than or equal to":
            validations.push(`gte(${metric}${messageOption})`);
            break;
          case "Less than":
            validations.push(`lt(${metric}${messageOption})`);
            break;
          case "Less than or equal to":
            validations.push(`lte(${metric}${messageOption})`);
            break;
          case "Multiple of":
            validations.push(`multipleOf(${metric}${messageOption})`);
            break;
          default:
            break;
        }
      }
    );

    const validationChain = validations.join("\n        .");

    return `${formatProp(prop.label)}: ${validationChain}`;
  };

  const validations = FormProperties.map((prop) => getZodValidation(prop));
  const requiredFields = FormProperties.filter((prop) => prop.required);

  const formSchema = `const formSchema = z
  .object({
      ${validations.join(",\n      ")}
  })
  .required({
    ${requiredFields
      .map((field) => `  ${formatProp(field.label)}: true`)
      .join(",\n    ")}
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
export default function FormComponent() {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
