import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/edit/data";
import BioEducationEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/education/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditEducation = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioEducationEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditEducation;
