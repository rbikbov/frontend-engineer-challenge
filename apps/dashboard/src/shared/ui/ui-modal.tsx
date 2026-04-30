import {
  useEffect,
  useRef,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';

import { useFocusTrap } from '@workspace/lib';
import { CrossIcon } from '@workspace/ui/icons';
import { cn } from '@workspace/ui/utils/cn';

type UiModalProps = {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
  disableScroll?: boolean;
  closeOnOutsideClick?: boolean;
};

export function UiModal({
  className,
  children,
  isOpen = false,
  onClose,
  disableScroll = false,
  closeOnOutsideClick = false,
}: UiModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!closeOnOutsideClick) return;
    const inModal = (e.target as HTMLDivElement).closest('[data-id=modal]');
    if (inModal) return;
    onClose();
  };

  useFocusTrap(modalRef, { enabled: isOpen, onClose });

  useEffect(() => {
    if (!disableScroll || !isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [disableScroll, isOpen]);

  if (!isOpen) {
    return null;
  }

  const modal = (
    <div
      role="button"
      tabIndex={-1}
      onKeyDown={(e) => {
        if (!closeOnOutsideClick || e.target !== e.currentTarget) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClose();
        }
      }}
      onClick={handleClick}
      className={cn(
        'bg-primary/50 fixed inset-0 z-50 flex overflow-y-auto p-6',
        className,
      )}
    >
      <div
        ref={modalRef}
        data-id="modal"
        role="dialog"
        aria-modal="true"
        className={cn(
          'bg-background rounded-modal m-auto p-8 shadow-md',
          'flex w-full max-w-[440px] flex-col',
        )}
      >
        <button
          onClick={onClose}
          aria-label="Закрыть модальное окно"
          className="rounded-button-sm hover:bg-primary/50 text-primary-inverse absolute top-0 right-0 m-6 flex h-8 w-8 cursor-pointer items-center justify-center transition-colors"
        >
          <CrossIcon />
        </button>
        {children}
      </div>
    </div>
  );

  return createPortal(modal, document.getElementById('modals')!);
}

UiModal.Header = function UiModalHeader({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn(className, 'text-h2 text-primary text-center')}>
      {children}
    </div>
  );
};

UiModal.Body = function UiModalBody({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        className,
        'text-foreground-secondary mt-5 text-center text-base',
      )}
    >
      {children}
    </div>
  );
};

UiModal.Footer = function UiModalFooter({
  children,
  className,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn(className, 'mt-8 flex justify-between gap-4')}>
      {children}
    </div>
  );
};
