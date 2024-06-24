import { reactive, computed } from 'vue';
import {
  validateField as validateFieldUtil,
  type ValidationRule
} from '~/helpers/inputValidation';

export interface FieldConfig {
  name: string;
  label: string;
  type: string;
  autocomplete?: string;
  required: boolean;
  rules: ValidationRule[];
}

export function useFormValidation(fieldConfigs: FieldConfig[]) {
  const form = reactive(
    fieldConfigs.reduce(
      (acc, field) => {
        acc[field.name] = field.type === 'checkbox' ? false : '';
        return acc;
      },
      {} as Record<string, string | boolean>
    )
  );

  const errors = reactive(
    fieldConfigs.reduce(
      (acc, field) => {
        acc[field.name] = null;
        return acc;
      },
      {} as Record<string, string | null>
    )
  );

  const touched = reactive(
    fieldConfigs.reduce(
      (acc, field) => {
        acc[field.name] = false;
        return acc;
      },
      {} as Record<string, boolean>
    )
  );

  const validateField = (fieldName: string) => {
    const field = fieldConfigs.find((f) => f.name === fieldName);
    if (!field) return;

    if (fieldName === 'repeatPassword') {
      errors[fieldName] =
        form[fieldName] !== form['password'] ? "Passwords don't match" : null;
    } else {
      errors[fieldName] = validateFieldUtil(
        form[fieldName].toString(),
        field.rules
      );
    }

    if (fieldName === 'password' && 'repeatPassword' in form) {
      validateField('repeatPassword');
    }
  };

  const updateField = (fieldName: string, value: string | boolean) => {
    form[fieldName] = value;
    validateField(fieldName);
  };

  const touchField = (fieldName: string) => {
    touched[fieldName] = true;
  };

  const shouldShowError = (fieldName: string): boolean => {
    return (
      touched[fieldName] ||
      (fieldName === 'repeatPassword' && touched['password'])
    );
  };

  const isFormValid = computed(() => {
    return fieldConfigs.every((field) => {
      const value = form[field.name];
      return (
        (field.type === 'checkbox' ? value === true : value !== '') &&
        errors[field.name] === null
      );
    });
  });

  const resetForm = () => {
    Object.keys(form).forEach((key) => {
      form[key] =
        fieldConfigs.find((f) => f.name === key)?.type === 'checkbox'
          ? false
          : '';
      errors[key] = null;
      touched[key] = false;
    });
  };

  const validateAllFields = () => {
    fieldConfigs.forEach((field) => {
      touched[field.name] = true;
      validateField(field.name);
    });
  };

  return {
    form,
    errors,
    touched,
    updateField,
    touchField,
    shouldShowError,
    isFormValid,
    resetForm,
    validateAllFields
  };
}
