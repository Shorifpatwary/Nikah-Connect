import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/edit/data";
import BioPersonalDetailsEditForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/personal-details/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const EditPersonalDetails = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <BioPersonalDetailsEditForm />
      </FormContainer>
    </Section>
  );
};

export default EditPersonalDetails;
