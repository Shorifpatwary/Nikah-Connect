import { FilledMarksInterface } from "@/assets/data/response-types/bio/filled-marks";
import { BioEditData } from "@/components/dashboard/bio-edit/data";
import EditBlock from "@/components/dashboard/bio-edit/edit-block";
import React from "react";
type props = {
  marks: FilledMarksInterface;
};

const EditActionLinks = ({ marks }: props) => {
  return (
    <div className="flex flex-wrap justify-start gap-3">
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.general.label}
        link={BioEditData.general.edit.link}
        editTitle={BioEditData.general.edit.label}
        mark={marks.general_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.location.label}
        link={BioEditData.location.edit.link}
        editTitle={BioEditData.location.edit.label}
        mark={marks.location_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.education.label}
        link={BioEditData.education.edit.link}
        editTitle={BioEditData.education.edit.label}
        mark={marks.education_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.personal_info.label}
        link={BioEditData.personal_info.edit.link}
        editTitle={BioEditData.personal_info.edit.label}
        mark={marks.personal_info_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.family.label}
        link={BioEditData.family.edit.link}
        editTitle={BioEditData.family.edit.label}
        mark={marks.family_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.profession.label}
        link={BioEditData.profession.edit.link}
        editTitle={BioEditData.profession.edit.label}
        mark={marks.profession_filled_marks}
      />{" "}
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.religious.label}
        link={BioEditData.religious.edit.link}
        editTitle={BioEditData.religious.edit.label}
        mark={marks.religious_activity_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.marital.label}
        link={BioEditData.marital.edit.link}
        editTitle={BioEditData.marital.edit.label}
        mark={marks.marital_info_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.expected_partner.label}
        link={BioEditData.expected_partner.edit.link}
        editTitle={BioEditData.expected_partner.edit.label}
        mark={marks.expected_partner_filled_marks}
      />
      <EditBlock
        className="w-5/12 max-sm:w-5/6"
        title={BioEditData.hidden.label}
        link={BioEditData.hidden.edit.link}
        editTitle={BioEditData.hidden.edit.label}
        mark={marks.hidden_info_filled_marks}
      />
    </div>
  );
};

export default React.memo(EditActionLinks);
