import { Option } from "@/components/blocks/inputBox/selectBox";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const parseSelectedOptions = (
  valueString: string,
  options: Option[]
): Option[] => {
  if (!valueString) return [];
  // Split the string into an array, trim whitespace, and match options
  return options.filter(option =>
    valueString
      .split(",")
      .map(val => val.trim())
      .includes(option.value)
  );
};

export function convertStringToArray<T>(input: string): T[] {
  if (!input) {
    return []; // Return an empty array if input is falsy
  }
  return input.split(",").map(item => item.trim()) as T[];
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
