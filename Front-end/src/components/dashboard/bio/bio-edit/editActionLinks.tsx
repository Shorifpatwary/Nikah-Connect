import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { Data } from "@/components/dashboard/bio/bio-edit/data";
import EditBlock from "@/components/dashboard/bio/bio-edit/edit-block";
import React from "react";
type props = {
  marks: FilledMarksInterface | undefined;
};

const EditActionLinks = ({ marks }: props) => {
  return (
    <div className="flex flex-wrap justify-start gap-3">
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.general.label}
        link={Data.general.edit.link}
        editTitle={Data.general.edit.label}
        mark={marks?.general_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.location.label}
        link={Data.location.edit.link}
        editTitle={Data.location.edit.label}
        mark={marks?.location_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.education.label}
        link={Data.education.edit.link}
        editTitle={Data.education.edit.label}
        mark={marks?.education_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.personal_info.label}
        link={Data.personal_info.edit.link}
        editTitle={Data.personal_info.edit.label}
        mark={marks?.personal_info_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.family.label}
        link={Data.family.edit.link}
        editTitle={Data.family.edit.label}
        mark={marks?.family_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.profession.label}
        link={Data.profession.edit.link}
        editTitle={Data.profession.edit.label}
        mark={marks?.profession_filled_marks}
      />{" "}
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.religious.label}
        link={Data.religious.edit.link}
        editTitle={Data.religious.edit.label}
        mark={marks?.religious_activity_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.marital.label}
        link={Data.marital.edit.link}
        editTitle={Data.marital.edit.label}
        mark={marks?.marital_info_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.expected_partner.label}
        link={Data.expected_partner.edit.link}
        editTitle={Data.expected_partner.edit.label}
        mark={marks?.expected_partner_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={Data.hidden.label}
        link={Data.hidden.edit.link}
        editTitle={Data.hidden.edit.label}
        mark={marks?.hidden_info_filled_marks}
      />
    </div>
  );
};

export default React.memo(EditActionLinks);
