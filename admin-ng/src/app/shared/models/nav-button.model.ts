export interface NavButton {
  label: string;
  link?: string;
  onClick?: () => void;
  colour: string;
  disabled?: boolean;
}
