import InstructorSidebar from '@/components/instructor/InstructorSidebar';

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <InstructorSidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
