export interface AddressI {
  street: string;
  city: string;
  postalCode: string;
}

export interface AddressErrorI {
  hasError: boolean;
  street: string;
  city: string;
  postalCode: string;
}
