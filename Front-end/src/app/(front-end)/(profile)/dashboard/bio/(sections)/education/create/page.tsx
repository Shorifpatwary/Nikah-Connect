import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/create/data";
import BioEducationCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateEducation = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioEducationCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateEducation;
