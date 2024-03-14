import Image from "next/image";

export default function Homepage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      Home
    </main>
  );
}
