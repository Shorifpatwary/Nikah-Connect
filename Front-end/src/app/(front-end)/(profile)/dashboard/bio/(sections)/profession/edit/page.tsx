import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/edit/data";
import BioProfessionEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditProfession = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioProfessionEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditProfession;
