import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="align-center flex flex-col justify-center">
      <h2>Not Found 404</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
