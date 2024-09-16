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

export const elements = [
  {
    label: "Text input",
    icon: <CaseSensitive size={16} />,
  },
  {
    label: "Email",
    icon: <Mail size={16} />,
  },
  {
    label: "Number Input",
    icon: <Plus size={16} />,
  },
  {
    label: "Textbox",
    icon: <BoxSelect size={16} />,
  },
  {
    label: "Date picker",
    icon: <Calendar size={16} />,
  },
  {
    label: "Url Input",
    icon: <Link size={16} />,
  },
  {
    label: "Range",
    icon: <SlidersHorizontal size={16} />,
  },
  {
    label: "Dropdown",
    icon: <ChevronDown size={16} />,
  },
  {
    label: "Muiltiple Choice",
    icon: <List size={16} />,
  },
  {
    label: "Checkbox",
    icon: <CircleCheck size={16} />,
  },
  {
    label: "Linebreak",
    icon: <MoveVertical size={16} />,
  },
  {
    label: "Switch",
    icon: <ToggleLeft size={16} />,
  },
];
