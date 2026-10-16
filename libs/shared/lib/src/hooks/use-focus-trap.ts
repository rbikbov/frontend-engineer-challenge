'use client';

import { useEffect, useRef, type RefObject } from 'react';

const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

interface UseFocusTrapOptions {
  enabled: boolean;
  onClose?: () => void;
}

export function useFocusTrap<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { enabled, onClose }: UseFocusTrapOptions,
) {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
        return;
      }

      if (e.key === 'Tab' && ref.current) {
        const focusableElements =
          ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    previousFocusRef.current = document.activeElement as HTMLElement;
    window.addEventListener('keydown', handleKeyDown);

    // Autofocus the first element
    const timer = setTimeout(() => {
      if (ref.current) {
        const focusableElements =
          ref.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        }
      }
    }, 0);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      if (previousFocusRef.current) {
        const elementToFocus = previousFocusRef.current;
        // Use setTimeout so focus is restored after the current event loop tick.
        // This prevents the event that closed the modal (e.g. Enter)
        // from firing again on the restored element (so-called "event bleeding").
        setTimeout(() => {
          elementToFocus.focus();
        }, 0);
      }
    };
  }, [enabled, onClose, ref]);
}
