"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

function getSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  try {
    return !sessionStorage.getItem("aadi_portfolio_loaded");
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

export function useSessionOnce() {
  const shouldShow = useSyncExternalStore(emptySubscribe, getSnapshot, getServerSnapshot);

  const markShown = () => {
    try {
      sessionStorage.setItem("aadi_portfolio_loaded", "true");
    } catch {
      // ignore
    }
  };

  return { shouldShow, markShown };
}
