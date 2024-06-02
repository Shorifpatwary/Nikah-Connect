"use client"; // Error components must be Client Components

import Section from "@/components/blocks/section";
import { TitleSm } from "@/components/blocks/typography";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <Section rowClassName="flex-col gap-4 gap-10 place-content-center w-6/12 justify-center items-center">
      <TitleSm className="text-center">Something went wrong!</TitleSm>
      <Button
        className="max-w-20"
        size="sm"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </Section>
  );
}
