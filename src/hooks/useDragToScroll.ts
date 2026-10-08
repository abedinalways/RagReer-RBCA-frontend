"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export function useDragToScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [canScroll, setCanScroll] = useState(false);
  const pos = useRef({ startX: 0, scrollLeft: 0, moved: false });

  // Check if content overflows horizontally
  const checkScrollable = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanScroll(el.scrollWidth > el.clientWidth);
  }, []);

  useEffect(() => {
    checkScrollable();
    const el = ref.current;
    if (!el) return;

    const observer = new ResizeObserver(() => checkScrollable());
    observer.observe(el);
    window.addEventListener("resize", checkScrollable);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkScrollable);
    };
  }, [checkScrollable]);

  // Global mouseup listener to stop drag if mouse released outside
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      // Small timeout to allow clickCapture to suppress click if dragged
      setTimeout(() => {
        pos.current.moved = false;
      }, 50);
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [isDragging]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;

    // Ignore interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest("input") ||
      target.closest("select") ||
      target.closest("textarea") ||
      target.closest('[role="button"]') ||
      target.closest('[role="switch"]') ||
      target.closest('[role="checkbox"]')
    ) {
      return;
    }

    if (el.scrollWidth <= el.clientWidth) return;

    setIsDragging(true);
    pos.current = {
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      moved: false,
    };
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const el = ref.current;
      if (!el) return;

      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - pos.current.startX) * 1.3;

      if (Math.abs(x - (pos.current.startX + el.offsetLeft)) > 4 || Math.abs(walk) > 4) {
        pos.current.moved = true;
      }

      el.scrollLeft = pos.current.scrollLeft - walk;
    },
    [isDragging]
  );

  const onMouseUp = useCallback(() => {
    setIsDragging(false);
    setTimeout(() => {
      pos.current.moved = false;
    }, 50);
  }, []);

  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if (pos.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      pos.current.moved = false;
    }
  }, []);

  return {
    ref,
    isDragging,
    canScroll,
    events: {
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onClickCapture,
    },
    dragClassName: `${canScroll ? (isDragging ? "cursor-grabbing select-none" : "cursor-grab") : ""} ${isDragging ? "select-none" : ""}`,
  };
}
