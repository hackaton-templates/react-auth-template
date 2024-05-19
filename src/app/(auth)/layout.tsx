import PageFooter from "@/components/page-footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div></div>
      <section className="grow flex flex-col justify-center items-center">
        {children}
      </section>
      <PageFooter className="mt-auto" />
    </>
  );
}
