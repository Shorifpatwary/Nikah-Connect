import { Option } from "@/components/blocks/inputBox/selectBox";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const parseSelectedOptions = (
  valueInput: string | string[],
  options: Option[]
): Option[] => {
  if (!valueInput) return [];

  // Convert input to an array if it's a string
  const values = Array.isArray(valueInput)
    ? valueInput
    : valueInput.split(",").map(val => val.trim());

  // Filter the options based on the values array
  return options.filter(option => values.includes(option.value));
};

export function convertStringToArray<T>(
  input: string,
  separator: string = ","
): T[] {
  if (!input) {
    return []; // Return an empty array if input is falsy
  }
  return input.split(separator).map(item => item.trim()) as T[];
}

export function extractDate<T extends string>(datetime: T): string {
  if (!datetime) {
    return ""; // Return an empty string if input is falsy
  }
  return datetime.split(" ")[0]; // Split by space and return the first part
}

export function formatReadableDate(dateString: string): string {
  if (!dateString) {
    return ""; // Return empty string if input is invalid
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ""; // Handle invalid date
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatMonthYearInBangla(dateString: string): string {
  if (!dateString) {
    return ""; // Return empty string if input is invalid
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ""; // Handle invalid date
  }

  const formattedMonth = new Intl.DateTimeFormat("bn", {
    month: "long",
  }).format(date);
  const formattedYear = new Intl.DateTimeFormat("bn", {
    year: "numeric",
  }).format(date);

  return `${formattedMonth}-${formattedYear}`;
}

export const getInitialSerialNumber = (
  perPage: string | number = 20,
  currentPage: string | number = 1
) => {
  return (Number(currentPage) - 1) * Number(perPage) + 1;
};
