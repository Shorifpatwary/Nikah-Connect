import UserEditForm from "@/app/(admin)/admin/user/[id]/edit/form";
import Section from "@/components/blocks/section";
import FormContainer from "@/components/dashboard/form-container";

type Props = {};

const UserEditPage = (props: Props) => {
  return (
    <Section rowClassName="justify-center">
      <FormContainer formTitle="Form Title" className="	">
        <UserEditForm />
      </FormContainer>
    </Section>
  );
};

export default UserEditPage;
