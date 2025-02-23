import BioFamilyInfoCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/family-info/data";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateFamily = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.create.title}>
        <BioFamilyInfoCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateFamily;
