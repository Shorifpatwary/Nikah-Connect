import DefaultLoading from "@/components/blocks/loading/default";
import Section from "@/components/blocks/section";
import dynamic from "next/dynamic";
const UsersTable = dynamic(
  () => import("@/components/dashboard/tables/users-table"),
  {
    loading: () => <DefaultLoading />,
  }
);
const Admin = () => {
  return (
    <>
      <Section>
        <h2>This is a Admin Home Page</h2>
      </Section>
    </>
  );
};

export default Admin;
