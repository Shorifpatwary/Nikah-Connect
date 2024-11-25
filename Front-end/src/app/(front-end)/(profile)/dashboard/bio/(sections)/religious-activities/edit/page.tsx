import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/edit/data";
import BioReligiousActivityEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioReligiousActivityEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditReligiousActivity;
