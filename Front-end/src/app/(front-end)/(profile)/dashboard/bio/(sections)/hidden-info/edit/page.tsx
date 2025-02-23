import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/data";
import HiddenInfoEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.edit.title}>
        <HiddenInfoEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditReligiousActivity;
