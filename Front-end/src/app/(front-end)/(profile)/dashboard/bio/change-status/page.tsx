import { Data } from "@/app/(front-end)/(profile)/dashboard/bio/change-status/data";
import ChangeBioStatusForm from "@/app/(front-end)/(profile)/dashboard/bio/change-status/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

const ChangeBioStatus = () => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle={Data.title}>
        <ChangeBioStatusForm />
      </FormContainer>
    </Section>
  );
};

export default ChangeBioStatus;
