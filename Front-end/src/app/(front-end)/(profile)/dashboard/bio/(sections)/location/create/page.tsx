import BioLocationCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/religious-activities/create/data";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateLocation = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioLocationCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateLocation;
