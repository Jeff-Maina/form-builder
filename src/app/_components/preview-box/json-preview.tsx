import { TFormData } from "@/app/types";

type TJsonPreview = {
  formData: TFormData;
};

const JSONPreview = ({ formData }: { formData: TFormData }) => {
  return (
    <div className="w-full p-4">
      <pre className="whitespace-pre-wrap w-full font-mono ">
        {JSON.stringify(formData, null, 2)}
      </pre>
    </div>
  );
};

export default JSONPreview;
