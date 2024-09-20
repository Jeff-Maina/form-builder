"use client";

import { useCallback, useEffect, useState } from "react";
import Editbox from "./_components/editbox";
import Sidebar from "./_components/sidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { TFormData, TProperty } from "./types";

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
      <div className=" max-w-7xl m-auto w-full lg:h-screen grid grid-cols-4 bg-grid">
        <div className="h-full col-span-3 p-3">
          <Editbox
            deleteField={deleteProperty}
            setRequired={setRequired}
            properties={formData.properties}
          />
        </div>
        <div className="h-full col-span-1 p-3">
          <Sidebar addProperty={addProperty} />
        </div>
      </div>{" "}
    </DragDropContext>
  );
}
