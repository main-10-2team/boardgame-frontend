export default function ReviewListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="flex animate-pulse items-center gap-2.5 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="h-[120px] w-[80px] rounded-lg bg-gray-200" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
            <div className="h-3 w-full rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
