"use client";

export default function FilterError({ error }: { error: Error }) {
  return <p>Error: {error.message}</p>;
}
