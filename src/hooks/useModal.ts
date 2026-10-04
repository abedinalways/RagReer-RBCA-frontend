"use client";

import { useState, useCallback, useRef } from "react";

export interface UseModalOptions<T = unknown> {
  initialOpen?: boolean;
  initialData?: T | null;
  onOpen?: (data?: T) => void;
  onClose?: () => void;
}

export interface UseModalReturn<T = unknown> {
  isOpen: boolean;
  data: T | null;
  open: (data?: T) => void;
  close: () => void;
  toggle: () => void;
  setData: React.Dispatch<React.SetStateAction<T | null>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  bind: {
    isOpen: boolean;
    onClose: () => void;
  };
}

export function useModal<T = unknown>(
  optionsOrInitialOpen?: boolean | UseModalOptions<T>,
  initialData: T | null = null
): UseModalReturn<T> {
  const options: UseModalOptions<T> =
    typeof optionsOrInitialOpen === "boolean"
      ? { initialOpen: optionsOrInitialOpen, initialData }
      : optionsOrInitialOpen || {};

  const [isOpen, setIsOpen] = useState<boolean>(options.initialOpen ?? false);
  const [data, setData] = useState<T | null>(options.initialData ?? null);

  const optionsRef = useRef(options);
  optionsRef.current = options;

  const open = useCallback((modalData?: T) => {
    if (modalData !== undefined) {
      setData(modalData);
    }
    setIsOpen(true);
    optionsRef.current.onOpen?.(modalData);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    optionsRef.current.onClose?.();
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        optionsRef.current.onOpen?.();
      } else {
        optionsRef.current.onClose?.();
      }
      return nextState;
    });
  }, []);

  return {
    isOpen,
    data,
    open,
    close,
    toggle,
    setData,
    setIsOpen,
    bind: {
      isOpen,
      onClose: close,
    },
  };
}

export default useModal;
