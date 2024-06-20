import UserEditForm from "@/app/(admin)/admin/user/[id]/edit/form";
import Section from "@/components/blocks/section";
import AdminFormContainer from "@/components/dashboard/form-container";

type Props = {};

const UserEditPage = (props: Props) => {
  return (
    <Section rowClassName="justify-center">
      <AdminFormContainer formTitle="Form Title" className="w-8/12	">
        <UserEditForm />
      </AdminFormContainer>
    </Section>
  );
};

export default UserEditPage;
