export default function TodayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inner min-h-[100dvh] bg-[linear-gradient(to_bottom,_#5a5a5a,_#17171B)] text-white">
      {children}
    </div>
  );
}
