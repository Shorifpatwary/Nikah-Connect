import ProfileSideBar from "@/components/blocks/profile-sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background antialiased">
      {/* Include shared UI here e.g. a header or sidebar */}
      <div>
        <ProfileSideBar />
      </div>
      {children}
    </main>
  );
}
