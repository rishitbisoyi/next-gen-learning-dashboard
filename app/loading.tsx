export default function Loading() {
  return (
    <main
      className="min-h-screen flex"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Sidebar skeleton */}
      <aside
        className="hidden md:flex md:w-[72px] lg:w-60 min-h-screen flex-col py-8 px-4 gap-3"
        style={{
          background: "var(--bg-surface)",
          borderRight: "1px solid var(--border-subtle)",
        }}
      >
        <div className="skeleton w-10 h-10 rounded-xl mb-6" />
        {[...Array(4)].map((_, i) => (
          <div key={i} className="skeleton h-10 w-full rounded-xl" />
        ))}
      </aside>

      {/* Content skeleton */}
      <section className="flex-1 p-8">
        <div className="skeleton h-6 w-40 rounded-lg mb-6" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* Hero */}
          <div
            className="skeleton col-span-1 sm:col-span-2 rounded-3xl"
            style={{ height: 180 }}
          />
          {/* Activity */}
          <div className="skeleton rounded-3xl" style={{ height: 180 }} />
          {/* Course cards */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="skeleton rounded-3xl" style={{ height: 160 }} />
          ))}
        </div>
      </section>
    </main>
  );
}