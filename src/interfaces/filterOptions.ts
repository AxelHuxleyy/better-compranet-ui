interface ValuesOptions {
  value: string;
  checked?: boolean;
}

export interface FilterOptions {
  category: string;
  isOpen: boolean;
  textSearch: string;
  values?: Array<ValuesOptions>;
  label: string;
}
