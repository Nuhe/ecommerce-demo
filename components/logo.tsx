import Link from "next/link";

export function Logo() {
  return (
    <Link className="logo" href="/" aria-label="Foxstore, inicio">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img"><path d="M9 8l8 6a18 18 0 0 1 14 0l8-6-2 15c1 3 1 7-1 10-3 5-7 8-12 8s-9-3-12-8c-2-3-2-7-1-10L9 8z"/><path className="logo-face" d="M17 26l5 3-4 2m13-5l-5 3 4 2M21 35h6"/></svg>
      </span>
      <span>fox<span>store</span></span>
    </Link>
  );
}
