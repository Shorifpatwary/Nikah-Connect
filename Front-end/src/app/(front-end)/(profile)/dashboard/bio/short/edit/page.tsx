import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/short/data";
import ShortBioEditForm from "@/app/(front-end)/(profile)/dashboard/bio/short/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const CreateShortBio = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <ShortBioEditForm />
      </FormContainer>
    </Section>
  );
};

export default CreateShortBio;
