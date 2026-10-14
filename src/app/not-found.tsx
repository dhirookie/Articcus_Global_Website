import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main" className="wrap sec">
      <p className="eyebrow">404</p>
      <h1 className="h1 sm">Page not found</h1>
      <p className="lead">
        This page may have moved. Explore our services or return to the home
        page.
      </p>
      <Link className="btn btn-primary" href="/">
        Back to home
      </Link>
    </main>
  );
}
