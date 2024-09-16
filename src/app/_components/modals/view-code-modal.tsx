import * as Dialog from "@/components/ui/dialog";

type TModalProps = {
  isViewingCode: boolean;
  setViewCode: (val: boolean) => void;
};

const ViewCodeModal = ({ isViewingCode, setViewCode }: TModalProps) => {
  return (
    <Dialog.Dialog open={isViewingCode} onOpenChange={setViewCode}>
      <Dialog.DialogContent className="bg-white min-h-[60vh] p-4"></Dialog.DialogContent>
    </Dialog.Dialog>
  );
};

export default ViewCodeModal;
