import { DraggableChildrenFn, DraggableId } from "@hello-pangea/dnd";

type TDraggableProps = {
  // required
  draggableId: DraggableId;
  index: number;
  children: DraggableChildrenFn;
  // optional
  isDragDisabled?: boolean;
  disableInteractiveElementBlocking?: boolean;
  shouldRespectForcePress?: boolean;
};

type TValidation = {
  name: string;
  message: string;
};

type TUiProp = {
  fontsize?: number;
  color?: string;
};
type TUi = {
  [key: string]: TUiProp;
};

type TUiSchema = TUi[];

type TProperty = {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  isLabelHidden: boolean;
  disabled: boolean;
  className?: string;
  validations?: TValidation[];
  uiSchema?: TUiSchema;
};

type TFormData = {
  title: string;
  description: string;
  required: string[];
  properties: TProperty[];
};

export type { TFormData, TProperty };
