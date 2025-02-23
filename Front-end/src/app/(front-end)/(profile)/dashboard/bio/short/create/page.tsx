import ShortBioCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/short/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/short/data";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateShortBio = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <ShortBioCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateShortBio;
