"use client";
import {
  allBio,
  backendUrl,
  bioMinFilledMarks,
  shortBios,
} from "@/assets/data/config/app.config";
import { BioWithFilledMarks } from "@/assets/data/response-types/bio";
import SubmitLoader from "@/components/blocks/form-helper/submit-loader";
import { ParagraphMd } from "@/components/blocks/typography";
import { Data } from "@/components/dashboard/bio/bio-edit/data";
import EditActionLinks from "@/components/dashboard/bio/bio-edit/editActionLinks";
import { Button } from "@/components/ui/button";
import { Toast } from "@/components/ui/use-toast";
import { fetchRequest } from "@/lib/request/fetchRequest";
import getAuthUserIdFromClientCookies from "@/lib/request/header/getAuthUserIdFromClientCookies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type props = {
  bioWithFilledMarks: BioWithFilledMarks | 404;
  toast: (props: Toast) => void;
};

const CreateActionLinks = ({ bioWithFilledMarks, toast }: props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleMoveToLargeBio = async () => {
    try {
      setIsLoading(true);
      const url = `${backendUrl}/api/bio/update-statuses-types`;
      const userId = getAuthUserIdFromClientCookies();

      const response = await fetchRequest<ResponseType>({
        url,
        options: {
          method: "PATCH",
          body: JSON.stringify({ type: "SHORT_TO_LONG_DRAFT" }),
        },
        tagRevalidate: [`${allBio}_${userId}`, `${shortBios}_${userId}`],
      });

      if (response.status === 200 || response.status === 201) {
        toast({
          title: Data.bio.moveToLong.success.title,
          variant: "primary",
          description: Data.bio.moveToLong.success.description,
        });
        router.push(Data.bio.moveToLong.success.redirectUrl);
      } else {
        toast({
          title: Data.bio.moveToLong.unKnownError.title,
          variant: "destructive",
          description: Data.bio.moveToLong.unKnownError.description,
        });
      }
    } catch (error) {
      toast({
        title: Data.bio.moveToLong.unKnownError.title,
        variant: "destructive",
        description: Data.bio.moveToLong.unKnownError.description,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!bioWithFilledMarks || bioWithFilledMarks === 404) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>{Data.initialText}</ParagraphMd>
        <Link href={Data.bio.create.link} prefetch={false} className="mx-auto">
          <Button className="text-xl">{Data.bio.create.label}</Button>
        </Link>
      </div>
    );
  } else if (bioWithFilledMarks.type === "SHORT") {
    return (
      <div className="flex flex-col justify-center gap-4 text-center align-middle">
        <ParagraphMd>{Data.moveToLongText}</ParagraphMd>
        <Button
          className="mx-auto max-w-min text-xl"
          onClick={handleMoveToLargeBio}
          disabled={isLoading}
        >
          {isLoading ? (
            <SubmitLoader text={Data.wait} />
          ) : (
            Data.bio.moveToLong.label
          )}
        </Button>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.general_filled_marks ||
    bioWithFilledMarks?.filled_marks?.general_filled_marks <
      bioMinFilledMarks.general
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.general_filled_marks
            ? Data.general.create.text
            : Data.general.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.general_filled_marks
              ? Data.general.create.link
              : Data.general.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.general_filled_marks
              ? Data.general.create.label
              : Data.general.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.location_filled_marks ||
    bioWithFilledMarks?.filled_marks?.location_filled_marks <
      bioMinFilledMarks.location
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.location_filled_marks
            ? Data.location.create.text
            : Data.location.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.location_filled_marks
              ? Data.location.create.link
              : Data.location.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.location_filled_marks
              ? Data.location.create.label
              : Data.location.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.education_filled_marks ||
    bioWithFilledMarks?.filled_marks?.education_filled_marks <
      bioMinFilledMarks.education
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.education_filled_marks
            ? Data.education.create.text
            : Data.education.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.education_filled_marks
              ? Data.education.create.link
              : Data.education.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.education_filled_marks
              ? Data.education.create.label
              : Data.education.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.personal_info_filled_marks ||
    bioWithFilledMarks?.filled_marks?.personal_info_filled_marks <
      bioMinFilledMarks.personal_info
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.personal_info_filled_marks
            ? Data.personal_info.create.text
            : Data.personal_info.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.personal_info_filled_marks
              ? Data.personal_info.create.link
              : Data.personal_info.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.personal_info_filled_marks
              ? Data.personal_info.create.label
              : Data.personal_info.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.family_filled_marks ||
    bioWithFilledMarks?.filled_marks?.family_filled_marks <
      bioMinFilledMarks.family
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.family_filled_marks
            ? Data.family.create.text
            : Data.family.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.family_filled_marks
              ? Data.family.create.link
              : Data.family.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.family_filled_marks
              ? Data.family.create.label
              : Data.family.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.profession_filled_marks ||
    bioWithFilledMarks?.filled_marks?.profession_filled_marks <
      bioMinFilledMarks.profession
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.profession_filled_marks
            ? Data.profession.create.text
            : Data.profession.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.profession_filled_marks
              ? Data.profession.create.link
              : Data.profession.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.profession_filled_marks
              ? Data.profession.create.label
              : Data.profession.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.religious_activity_filled_marks ||
    bioWithFilledMarks?.filled_marks?.religious_activity_filled_marks <
      bioMinFilledMarks.religious
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.religious_activity_filled_marks
            ? Data.religious.create.text
            : Data.religious.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.religious_activity_filled_marks
              ? Data.religious.create.link
              : Data.religious.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.religious_activity_filled_marks
              ? Data.religious.create.label
              : Data.religious.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.marital_info_filled_marks ||
    bioWithFilledMarks?.filled_marks?.marital_info_filled_marks <
      bioMinFilledMarks.marital
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.marital_info_filled_marks
            ? Data.marital.create.text
            : Data.marital.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.marital_info_filled_marks
              ? Data.marital.create.link
              : Data.marital.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.marital_info_filled_marks
              ? Data.marital.create.label
              : Data.marital.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.expected_partner_filled_marks ||
    bioWithFilledMarks?.filled_marks?.expected_partner_filled_marks <
      bioMinFilledMarks.expected_partner
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.expected_partner_filled_marks
            ? Data.expected_partner.create.text
            : Data.expected_partner.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.expected_partner_filled_marks
              ? Data.expected_partner.create.link
              : Data.expected_partner.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.expected_partner_filled_marks
              ? Data.expected_partner.create.label
              : Data.expected_partner.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else if (
    !bioWithFilledMarks?.filled_marks?.hidden_info_filled_marks ||
    bioWithFilledMarks?.filled_marks?.hidden_info_filled_marks <
      bioMinFilledMarks.hidden
  ) {
    return (
      <div className="flex flex-col justify-center gap-4 align-middle">
        <ParagraphMd>
          {!bioWithFilledMarks?.filled_marks?.hidden_info_filled_marks
            ? Data.hidden.create.text
            : Data.hidden.edit.text}
        </ParagraphMd>
        <Link
          href={
            !bioWithFilledMarks?.filled_marks?.hidden_info_filled_marks
              ? Data.hidden.create.link
              : Data.hidden.edit.link
          }
          prefetch={false}
          className="mx-auto"
        >
          <Button className="text-xl">
            {!bioWithFilledMarks?.filled_marks?.hidden_info_filled_marks
              ? Data.hidden.create.label
              : Data.hidden.edit.label}
          </Button>
        </Link>
      </div>
    );
  } else {
    return <EditActionLinks marks={bioWithFilledMarks.filled_marks} />;
  }
};

export default React.memo(CreateActionLinks);
