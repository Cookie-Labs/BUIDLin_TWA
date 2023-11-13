import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[100vh] max-w-[100vw] flex-col items-center justify-center gap-12 bg-primary">
      <span className="text-title">Not Found 404</span>
      <span className="text-xl">Could not find requested resource</span>
      <Link
        href="/"
        className="cursor-pointer rounded-2xl bg-gray14 px-10 py-5 no-underline duration-200 hover:scale-105 hover:text-white active:scale-100 visited:text-gray10 link:text-gray10"
      >
        Return Home
      </Link>
    </div>
  );
}
