import { ElementsObj } from "@/app/data/Elements";
import { TFormData, TProperty } from "@/app/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";

type TFormPreviewProps = {
  formData: TFormData;
  deleteField: (id: string) => void;
  setProperties: (properties: TProperty[]) => void;
  updateProperty: (property: TProperty) => void;
};

const FormPreview = ({
  formData,
  deleteField,
  setProperties,
  updateProperty,
}: TFormPreviewProps) => {
  const { properties, description, title } = formData;
  const [propertiesState, setPropertiesState] = useState(properties);

  useEffect(() => {
    setPropertiesState(properties);
  }, [formData.properties]);

  console.log("rerender")
  return (
    <ScrollArea className="max-h-[90vh] flex flex-col py-4 pr-4 overflow-x-auto">
      <div className=" bg-white border py-4 min-h-96 max-w-lg rounded-md !mx-auto">
        <div className="flex flex-col gap-2 px-6">
          <h1 className="text-xl font-bold tracking-tight">Login </h1>
          <p className="text-sm text-neutral-500">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="p-2">
          {propertiesState.map((prop, index) => {
            const Component = ElementsObj[prop.type];
            return (
              <Component
                setProperties={setProperties}
                deleteField={deleteField}
                updateProperty={updateProperty}
                item={prop}
              />
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
};

export default FormPreview;
