import { DomainProvider } from "@/context/Domain-Context";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DomainProvider>
      <main>{children}</main>
    </DomainProvider>
  );
}
