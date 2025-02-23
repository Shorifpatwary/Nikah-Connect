import HiddenInfoCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/hidden-info/data";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.create.title}>
        <HiddenInfoCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateReligiousActivity;
