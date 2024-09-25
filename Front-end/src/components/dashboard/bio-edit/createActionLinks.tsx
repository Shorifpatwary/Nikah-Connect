import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { BioEditData } from "@/components/dashboard/bio-edit/data";
import EditActionLinks from "@/components/dashboard/bio-edit/editActionLinks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
type props = {
  marks: FilledMarksInterface;
};

const CreateActionLinks = ({ marks }: props) => {
  if (!marks?.general_filled_marks) {
    console.log(marks?.general_filled_marks, "filled marks-");
    return (
      <Link href={BioEditData.general.create.link} prefetch={false}>
        <Button className="text-xl">{BioEditData.general.create.label}</Button>
      </Link>
    );
  } else if (!marks?.location_filled_marks) {
    return (
      <Link href={BioEditData.location.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.location.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.education_filled_marks) {
    return (
      <Link href={BioEditData.education.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.education.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.personal_info_filled_marks) {
    return (
      <Link href={BioEditData.personal_info.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.personal_info.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.family_filled_marks) {
    return (
      <Link href={BioEditData.family.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.family.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.profession_filled_marks) {
    return (
      <Link href={BioEditData.profession.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.profession.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.religious_activity_filled_marks) {
    return (
      <Link href={BioEditData.religious.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.religious.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.marital_info_filled_marks) {
    return (
      <Link href={BioEditData.marital.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.marital.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.expected_partner_filled_marks) {
    return (
      <Link href={BioEditData.expected_partner.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.expected_partner.create.label}
        </Button>
      </Link>
    );
  } else if (!marks?.hidden_info_filled_marks) {
    return (
      <Link href={BioEditData.hidden.create.link} prefetch={false}>
        <Button size="lg" className="text-xl">
          {BioEditData.hidden.create.label}
        </Button>
      </Link>
    );
  } else {
    return <EditActionLinks marks={marks} />;
  }
};

export default React.memo(CreateActionLinks);
