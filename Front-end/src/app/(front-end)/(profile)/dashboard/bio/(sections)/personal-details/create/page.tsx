import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/create/data";
import BioPersonalDetailsCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreatePersonalDetails = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioPersonalDetailsCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreatePersonalDetails;
