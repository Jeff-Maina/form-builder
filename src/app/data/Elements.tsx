import {
  BoxSelect,
  Calendar,
  CaseSensitive,
  ChevronDown,
  CircleCheck,
  Link,
  List,
  Mail,
  MoveVertical,
  Plus,
  SlidersHorizontal,
  ToggleLeft,
} from "lucide-react";
import TextInput from "../_components/elements/text-input/text-input";
import EmailInput from "../_components/elements/email_input/email_input";
import NumberInput from "../_components/elements/number_input/number_input";
import Textbox from "../_components/elements/textbox/textbox";
import Datepicker from "../_components/elements/date_picker/date_picker";
import UrlInput from "../_components/elements/url_input/url_input";
import Range from "../_components/elements/range/range";
import DropdownComp from "../_components/elements/dropdown/dropdown";
import Multiplechoice from "../_components/elements/multiple_choice/multiple_choice";
import CheckboxComp from "../_components/elements/checkbox/checkbox";
import Linebreak from "../_components/elements/linebreak/linebreak";
import SwitchComp from "../_components/elements/switch/switch";

type TElement = {
  label: string;
  icon: React.ReactNode;
  component: JSX.Element;
  type: string;
};

export const elements: TElement[] = [
  {
    label: "Text input",
    icon: <CaseSensitive size={16} />,
    component: <TextInput />,
    type: "text_input",
  },
  {
    label: "Email",
    icon: <Mail size={16} />,
    component: <EmailInput />,
    type: "email_input",
  },
  {
    label: "Number Input",
    icon: <Plus size={16} />,
    component: <NumberInput />,
    type: "number_input",
  },
  {
    label: "Textbox",
    icon: <BoxSelect size={16} />,
    type: "text_box",
    component: <Textbox />,
  },
  {
    label: "Date picker",
    icon: <Calendar size={16} />,
    type: "date_picker",
    component: <Datepicker />,
  },
  {
    label: "Url Input",
    icon: <Link size={16} />,
    component: <UrlInput />,
    type: "url_input",
  },
  {
    label: "Range",
    icon: <SlidersHorizontal size={16} />,
    component: <Range />,
    type: "range",
  },
  {
    label: "Dropdown",
    icon: <ChevronDown size={16} />,
    component: <DropdownComp />,
    type: "dropdown",
  },
  {
    label: "Muiltiple Choice",
    icon: <List size={16} />,
    component: <Multiplechoice />,
    type: "multichoice",
  },
  {
    label: "Checkbox",
    icon: <CircleCheck size={16} />,
    component: <CheckboxComp />,
    type: "checkbox",
  },
  {
    label: "Linebreak",
    icon: <MoveVertical size={16} />,
    component: <Linebreak />,
    type: "linebreak",
  },
  {
    label: "Switch",
    icon: <ToggleLeft size={16} />,
    component: <SwitchComp />,
    type: "switch",
  },
];

export const ElementsObj: Record<string, React.ComponentType<any>> = {
  text_input: TextInput,
  email_input: EmailInput,
  number_input: NumberInput,
  text_box: Textbox,
  date_picker: Datepicker,
  url_input: UrlInput,
  range: Range,
  dropdown: DropdownComp,
  multichoice: Multiplechoice,
  checkbox: CheckboxComp,
  linebreak: Linebreak,
  switch: SwitchComp,
};
