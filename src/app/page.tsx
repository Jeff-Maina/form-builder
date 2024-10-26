"use client";

import { useCallback, useEffect, useState } from "react";
import Editbox from "./_components/editbox";
import Sidebar from "./_components/sidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { TFormData, TProperty } from "./types";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Home() {
  const onDragEnd = useCallback(() => {
    // the only one that is required
  }, []);

  const [formItems, setFormItems] = useState([]);

  const [formData, setFormData] = useState<TFormData>({
    title: "",
    description: "",
    required: [],
    properties: [],
  });

  const setRequired = (value: string) => {
    if (formData.required.includes(value)) {
      setFormData({
        ...formData,
        required: formData.required.filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        required: [...formData.required, value],
      });
    }
  };

  const setProperties = (properties: TProperty[]) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: properties,
    }));
  };

  const addProperty = (obj: TProperty) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: [...prevFormData.properties, obj],
    }));

  };

  const deleteProperty = (id: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      properties: prevFormData.properties.filter((item) => item.id !== id),
    }));
  };

  useEffect(() => {
    console.log(formData); // Logs the updated formData
  }, [formData]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" max-w-[110rem] m-auto w-full lg:h-screen grid grid-cols-5 bg-grid">
        <div className=" col-span-1 p-3">
          <Sidebar addProperty={addProperty} />
        </div>

        <div className="h-screen col-span-2 p-3">
          <Editbox
            deleteField={deleteProperty}
            setRequired={setRequired}
            properties={formData.properties}
            setProperties={setProperties}
          />
        </div>

        <div className="h-screen col-span-2 p-3">
          <div className="w-full h-full border rounded-md"></div>
        </div>
      </div>{" "}
    </DragDropContext>
  );
}
