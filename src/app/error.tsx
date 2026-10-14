'use client';

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="wrap sec">
      <h1 className="h1 sm">Something went wrong</h1>
      <p className="lead">Please try loading the page again.</p>
      <button className="btn btn-primary" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
