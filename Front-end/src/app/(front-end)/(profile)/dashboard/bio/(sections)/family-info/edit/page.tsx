import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/data";
import BioFamilyInfoEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditFamily = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.edit.title}>
        <BioFamilyInfoEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditFamily;
