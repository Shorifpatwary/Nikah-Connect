import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/create/data";
import BioFamilyInfoCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateFamily = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioFamilyInfoCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateFamily;
