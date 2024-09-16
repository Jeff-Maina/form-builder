import { Button } from "@/components/ui/button";
import * as Dialog from "@/components/ui/dialog";

type TModalProps = {
  isResetingForm: boolean;
  setResetingForm: (val: boolean) => void;
};

const ResetModal = ({ isResetingForm, setResetingForm }: TModalProps) => {
  return (
    <Dialog.Dialog open={isResetingForm} onOpenChange={setResetingForm}>
      <Dialog.DialogContent className="bg-white w-[350px] p-4">
        <Dialog.DialogHeader>
          <Dialog.DialogTitle className="mb-3">
            Are you absolutely sure?
          </Dialog.DialogTitle>
          <Dialog.DialogDescription>
            This action cannot be undone. This will permanently reset your form
          </Dialog.DialogDescription>
        </Dialog.DialogHeader>
        <Dialog.DialogFooter>
          <Button className="w-full font-semibold" variant={"destructive"}>
            Reset form
          </Button>
        </Dialog.DialogFooter>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};

export default ResetModal;
