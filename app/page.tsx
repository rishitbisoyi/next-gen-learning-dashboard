import Sidebar from "@/components/Sidebar";
import BentoGrid from "@/components/BentoGrid";
import { getCourses } from "@/lib/getCourses";
import MobileNav from "@/components/MobileNav";

export default async function Home() {
  const courses = await getCourses();

  return (
    <main
      className="min-h-screen text-white relative overflow-hidden"
      style={{ background: "var(--bg-base)" }}
    >
      {/* Ambient background blobs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
      >
        <div
          className="absolute rounded-full blur-[120px] opacity-[0.07]"
          style={{
            width: 600,
            height: 600,
            top: -200,
            left: -100,
            background:
              "radial-gradient(circle, #00e5cc 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[140px] opacity-[0.05]"
          style={{
            width: 500,
            height: 500,
            bottom: -100,
            right: -80,
            background:
              "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px] opacity-[0.04]"
          style={{
            width: 400,
            height: 400,
            top: "40%",
            left: "40%",
            background:
              "radial-gradient(circle, #f59e0b 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative flex">
        <Sidebar />
        <BentoGrid courses={courses} />
      </div>

      <MobileNav />
    </main>
  );
}