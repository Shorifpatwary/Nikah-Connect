import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/create/data";
import BioExpectedPartnerCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/expected-partner/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioExpectedPartnerCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateReligiousActivity;
