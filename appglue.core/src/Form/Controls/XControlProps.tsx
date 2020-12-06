export interface TextFieldProps {
  label?: string;
  size: string;
  width: string;
  variant: string;
  type?: string;
  value: string;
  onChange: any;
  error: boolean;
  fullWidth: boolean;
  customStyle?: string;
  isPicker? :boolean;
}