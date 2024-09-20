"use client";

import { useCallback, useState } from "react";
import Editbox from "./_components/editbox";
import Sidebar from "./_components/sidebar";
import { DragDropContext } from "@hello-pangea/dnd";
import { TFormData } from "./types";

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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" max-w-7xl m-auto w-full lg:h-screen grid grid-cols-4 bg-grid">
        <div className="h-full col-span-1 p-3">
          <Sidebar />
        </div>
        <div className="h-full col-span-3 p-3">
          <Editbox setRequired={setRequired} properties={formData.properties} />
        </div>
      </div>{" "}
    </DragDropContext>
  );
}
