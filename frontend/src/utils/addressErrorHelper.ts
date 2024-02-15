import { AddressErrorI, AddressI } from "../models/address.model";

export default function addressErrorHelper(address: AddressI) {
  let errors: Partial<AddressErrorI> = {};

  if (
    address.street.trim() === "" ||
    address.city.trim() === "" ||
    address.postalCode.trim() === ""
  ) {
    errors.hasError = true;
    errors.street = "Street must not be empty and must be valid!";
    errors.city = "City must not be empty and must be valid!";
    errors.postalCode = "Postal code must not be empty and must be valid!";
  } else {
    errors.hasError = false;
    errors.street = "";
    errors.city = "";
    errors.postalCode = "";
  }

  return errors;
}
