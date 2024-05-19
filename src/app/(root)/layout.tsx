import PageFooter from "@/components/page-footer";
import PageHeader from "@/components/page-header";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PageHeader />
      <section className="px-6 py-4">{children}</section>
      <PageFooter className="mt-auto" />
    </>
  );
}
