import SportsHeader from "@/components/sports/SportsHeader";

export default function SportsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SportsHeader />
      {children}
    </>
  );
}
