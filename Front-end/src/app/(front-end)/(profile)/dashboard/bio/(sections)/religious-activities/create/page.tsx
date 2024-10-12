import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/create/data";
import BioReligiousActivityCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioReligiousActivityCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateReligiousActivity;
