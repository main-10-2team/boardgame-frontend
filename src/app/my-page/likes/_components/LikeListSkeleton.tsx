export function LikeListSkeleton() {
  return (
    <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 12 }).map((_, idx) => (
        <div
          key={idx}
          className="aspect-[3/4] animate-pulse rounded-lg bg-gray-200"
        />
      ))}
    </div>
  );
}
