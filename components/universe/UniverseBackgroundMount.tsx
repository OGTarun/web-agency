"use client";

import dynamic from "next/dynamic";

const UniverseBackground = dynamic(
  () => import("./UniverseBackground"),
  { ssr: false },
);

export default function UniverseBackgroundMount() {
  return <UniverseBackground />;
}
