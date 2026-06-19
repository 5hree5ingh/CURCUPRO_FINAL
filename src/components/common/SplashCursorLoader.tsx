"use client";

import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/ui/SplashCursor"), { ssr: false });

export default function SplashCursorLoader(props: Record<string, unknown>) {
  return <SplashCursor {...props} />;
}
