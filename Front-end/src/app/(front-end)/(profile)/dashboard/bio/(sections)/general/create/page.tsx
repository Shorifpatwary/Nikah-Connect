import BioCreateForm from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/create/form";
import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/(sections)/general/data";
import Section from "@/components/blocks/section";

import FormContainer from "@/components/dashboard/form-container";

const CreateGeneral = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.create.title}>
        <BioCreateForm />
      </FormContainer>
    </Section>
  );
};

export default CreateGeneral;
