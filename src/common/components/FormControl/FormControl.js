import { formControlProps } from "@/common/utils/Form";

const props = {
  ...formControlProps,
  as: {
    type: String,
    default: "div",
  },
};

export const FormControl = {
  name: "FormControl",
  props,
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
