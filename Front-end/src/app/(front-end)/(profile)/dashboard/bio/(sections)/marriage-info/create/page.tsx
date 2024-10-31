import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/create/data";
import MarriageInfoCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/create/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <MarriageInfoCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateReligiousActivity;
