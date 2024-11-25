import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/edit/data";
import BioLocationEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/location/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateLocation = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioLocationEditForm />
      </FormContainer>
    </Section>
  );
};

export default CreateLocation;
