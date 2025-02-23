import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/data";
import BioGeneralEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateGeneral = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.edit.title}>
        <BioGeneralEditForm />
      </FormContainer>
    </Section>
  );
};

export default CreateGeneral;
