import BioCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateGeneral = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle="সাধারন তথ্য">
        <BioCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateGeneral;
