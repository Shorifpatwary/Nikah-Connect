import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/data";
import BioProfessionEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/profession/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditProfession = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.edit.title}>
        <BioProfessionEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditProfession;
