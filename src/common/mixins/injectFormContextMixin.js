import { formControlProps } from "@/common/utils/Form";

export const injectFormContextMixin = {
  props: formControlProps,
  inject: {
    $FormContext: {
      default: null,
    },
  },
  computed: {
    formControl() {
      return this.$FormContext?.() ?? this.$props;
    },
  },
};
