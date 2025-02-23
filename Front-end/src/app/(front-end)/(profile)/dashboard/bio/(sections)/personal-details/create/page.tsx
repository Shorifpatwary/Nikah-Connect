import BioPersonalDetailsCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/data";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreatePersonalDetails = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.create.title}>
        <BioPersonalDetailsCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreatePersonalDetails;
