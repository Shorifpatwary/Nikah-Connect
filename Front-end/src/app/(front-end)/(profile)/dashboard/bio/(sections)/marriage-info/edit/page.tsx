import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/edit/data";
import MarriageInfoEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/marriage-info/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditReligiousActivity = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <MarriageInfoEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditReligiousActivity;
