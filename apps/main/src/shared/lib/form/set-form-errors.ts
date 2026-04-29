import { UseFormReturn, FieldValues, Path } from 'react-hook-form';

import { ROOT_FIELD } from '@workspace/constants';

export function setFormErrors<T extends FieldValues>(
  form: UseFormReturn<T> &
    ('root' extends keyof T
      ? { error: "Field 'root' is reserved for global errors" }
      : unknown),
  fields: Record<string, string>,
) {
  Object.entries(fields).forEach(([field, message]) => {
    // Адаптируем доменный ROOT_FIELD в специфичный для react-hook-form 'root'
    const rhfField = field === ROOT_FIELD ? 'root' : field;
    form.setError(rhfField as Path<T> | 'root', { type: 'server', message });
  });
}
