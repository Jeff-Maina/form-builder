import { ElementsObj } from "@/app/data/Elements";
import { TFormData, TProperty, TValidation } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { ZodTypeAny, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// helpers
const formatProp = (val: string) => val.toLowerCase().split(" ").join("");

// function generateZodSchema(formItems: TProperty[]) {
//   const schema: Record<string, z.ZodType<any>> = {};

//   formItems.forEach((item) => {
//     const inputType = item.type;
//     const inputName = formatProp(item.label);

//     let fieldSchema = inputType.includes("number")
//       ? z.coerce.number()
//       : z.string();

//     // Apply  based on TValidation
//     item.validations?.forEach((rule) => {
//       const options = { message: rule.errorMessage };

//       if (fieldSchema === z.coerce.number()) {
//       }

//       if (fieldSchema === z.string()) {

//         // if (inputType.includes("url")) {
//         //   fieldSchema = fieldSchema.url();
//         // }

//         // if (inputType.includes("email")) {
//         //   fieldSchema = fieldSchema.email();
//         // }

//         switch (rule.name) {
//           case "Minimum length":
//             fieldSchema = fieldSchema.min(rule.metric as number, options);
//             break;
//           case "Maximum length":
//             fieldSchema = fieldSchema.max(rule.metric as number, options);
//             break;
//           case "Contains":
//             fieldSchema = fieldSchema.includes(rule.metric as string, options);
//             break;
//           case "Regex":
//             fieldSchema = fieldSchema.regex(
//               new RegExp(rule.metric as string),
//               options
//             );
//             break;
//           default:
//             throw new Error("Unsupported validation type: " + rule.name);
//         }
//       }
//     });

//     schema[inputName] = fieldSchema;
//   });

//   return z.object(schema);
// }

function generateZodSchema(formItems: TProperty[]) {
  const schema: Record<string, z.ZodType<any>> = {};

  formItems.forEach((item) => {
    const inputName = formatProp(item.label);
    const inputType = item.type;
    // Determine the base schema based on field type
    // let fieldSchema = inputType.includes("number")
    //   ? z.coerce.number()
    //   : z.string();

    let fieldSchema = z.string();

    // Apply validations based on TValidation
    item.validations?.forEach((rule) => {
      
      const options = {
        message: rule.errorMessage ? rule.errorMessage : undefined,
      };

      switch (rule.name) {
        case "Minimum length":
          fieldSchema = fieldSchema.min(rule.metric as number, options);
          break;
        case "Maximum length":
          fieldSchema = fieldSchema.max(rule.metric as number, options);
          break;
        case "Contains":
          fieldSchema = fieldSchema.includes(rule.metric as string, options);
          break;
        case "Regex":
          fieldSchema = fieldSchema.regex(
            new RegExp(rule.metric as string),
            options
          );
          break;
        case "Email":
          fieldSchema = fieldSchema.email(options);
          break;
        case "Url":
          fieldSchema = fieldSchema.url(options);
          break;
        default:
          throw new Error("Unsupported validation type: " + rule.name);
      }
    });

    // Assign the final schema to the field name
    schema[inputName] = fieldSchema;
  });

  return z.object(schema);
}

type TFormPreviewProps = {
  formData: TFormData;
  deleteField: (id: string) => void;
  setFormProperties: (properties: TProperty[]) => void;
  updateProperty: (property: TProperty) => void;
};

const FormPreview = ({
  formData,
  deleteField,
  setFormProperties,
  updateProperty,
}: TFormPreviewProps) => {
  const { properties, description, title, hideDescription, hideTitle } =
    formData;

  const [localProperties, setLocalProperties] = useState(formData.properties);

  const schema = generateZodSchema(formData.properties);

  useEffect(() => {
    setLocalProperties(properties);
  }, [formData]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof schema>) {
    console.log(properties);
    console.log(values);
  }

  return (
    <ScrollArea className="max-h-[90vh] flex flex-col py-4 pr-4 overflow-x-auto">
      <div className=" bg-white border py-4 min-h-96 max-w-lg rounded-md !mx-auto flex flex-col gap-6">
        <div className="flex flex-col gap-2 px-6">
          {hideTitle || (
            <h1 className="text-xl font-bold tracking-tight">{title} </h1>
          )}{" "}
          {hideDescription || (
            <p className="text-sm text-neutral-500">{description} </p>
          )}
        </div>
        <div className="p-2 flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {properties.map((prop, index) => {
                const name = formatProp(prop.label);
                return (
                  <FormField
                    key={prop.id}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{prop.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder={prop.placeholder}
                            {...field}
                          />
                        </FormControl>
                        {prop.type}
                        <FormDescription>{prop.description}</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </div>
    </ScrollArea>
  );
};

export default FormPreview;
