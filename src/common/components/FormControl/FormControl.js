import { formControlProps } from "@/common/utils/Form";

export const FormControl = {
  name: "FormControl",
  props: {
    ...formControlProps,
    as: {
      type: String,
      default: "div",
    },
  },
  inject: {
    $FormContext: {
      default: null,
    },
  },
  provide() {
    return {
      $FormContext: () => this.context,
    };
  },
  computed: {
    formContext() {
      return this.$FormContext?.() ?? this.context;
    },
    context() {
      // eslint-disable-next-line no-unused-vars
      const { _as, ...props } = this.$props;

      return props;
    },
  },
  render(h) {
    return h(
      this.as,
      {
        attrs: {
          role: "group",
        },
      },
      this.$scopedSlots.default(this.context)
    );
  },
};
