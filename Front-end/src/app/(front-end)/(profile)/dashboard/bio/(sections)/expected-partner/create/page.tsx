import BioExpectedPartnerCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/data";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.create.title}>
        <BioExpectedPartnerCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateReligiousActivity;
