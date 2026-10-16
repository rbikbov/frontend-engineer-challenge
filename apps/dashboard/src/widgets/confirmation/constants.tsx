import { ConfirmModalParams } from './model/types';

export const defaultConfirmationParams: ConfirmModalParams = {
  title: 'Confirm action',
  description: 'Are you sure you want to continue?',
  closeText: 'Cancel',
  confirmText: 'Confirm',
  onClose: () => {},
  onConfirm: () => {},
};
