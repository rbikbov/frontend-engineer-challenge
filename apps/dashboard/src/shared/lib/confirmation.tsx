import { createStrictContext, useStrictContext } from '@workspace/lib';

export type ConfirmationParams = {
  title?: string;
  description?: string;
  closeText?: string;
  confirmText?: string;
  disableScroll?: boolean;
  closeOnOutsideClick?: boolean;
};

export type ConfirmationContext = {
  getConfirmation: (params: ConfirmationParams) => Promise<boolean>;
  closeConfirmation: () => void;
};

export const confirmationContext = createStrictContext<ConfirmationContext>();

export const useGetConfirmation = () => {
  const { getConfirmation } = useStrictContext(confirmationContext);

  return getConfirmation;
};
