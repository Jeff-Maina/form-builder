import * as Dialog from "@/components/ui/dialog";

type TModalProps = {
  isPreviewingForm: boolean;
  setPreviewForm: (val: boolean) => void;
};

const PreviewForm = ({ isPreviewingForm, setPreviewForm }: TModalProps) => {
  return (
    <Dialog.Dialog open={isPreviewingForm} onOpenChange={setPreviewForm}>
      <Dialog.DialogContent className="bg-white min-h-[60vh] p-4"></Dialog.DialogContent>
    </Dialog.Dialog>
  );
};

export default PreviewForm;
