import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/create/data";
import BioProfessionCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateProfession = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioProfessionCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateProfession;
