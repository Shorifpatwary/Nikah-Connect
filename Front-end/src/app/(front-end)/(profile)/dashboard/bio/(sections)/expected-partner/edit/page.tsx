import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/data";
import BioExpectedPartnerEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.edit.title}>
        <BioExpectedPartnerEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditReligiousActivity;
