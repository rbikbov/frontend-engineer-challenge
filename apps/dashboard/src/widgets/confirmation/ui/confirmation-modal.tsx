import { Button } from '@workspace/ui/components/button';

import { UiModal } from '@shared/ui/ui-modal';

import { ConfirmModalParams } from '../model/types';

export function ConfirmationModal({ params }: { params: ConfirmModalParams }) {
  return (
    <UiModal
      isOpen
      onClose={params.onClose}
      disableScroll={params.disableScroll}
      closeOnOutsideClick={params.closeOnOutsideClick}
    >
      <UiModal.Header>{params.title}</UiModal.Header>
      <UiModal.Body>{params.description}</UiModal.Body>
      <UiModal.Footer>
        <Button
          variant="secondarySecondary"
          className="w-full"
          onClick={params.onClose}
        >
          {params.closeText}
        </Button>
        <Button variant="primary" className="w-full" onClick={params.onConfirm}>
          {params.confirmText}
        </Button>
      </UiModal.Footer>
    </UiModal>
  );
}
