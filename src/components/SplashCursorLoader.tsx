"use client";

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("./SplashCursor"), { ssr: false });

export default function SplashCursorLoader(props: Record<string, unknown>) {
  return <SplashCursor {...props} />;
}
