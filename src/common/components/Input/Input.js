import styles from "./Input.module.scss";
import { injectFormContextMixin } from "@/common/mixins";

const props = {
  as: {
    type: String,
    default: "input",
  },
  size: {
    type: String,
    default: "md",
  },
  value: {
    type: [String, Number],
    default: undefined,
  },
  placeholder: String,
};

export const Input = {
  name: "Input",
  props,
  mixins: [injectFormContextMixin],
  methods: {
    emitChange(event) {
      this.$emit("input", event.target.value, event);
      this.$emit("change", event);
    },
  },
  render(h) {
    return h(
      this.as,
      {
        class: styles.input,
        domProps: {
          value: this.value,
        },
        attrs: {
          readonly: this.formControl.readonly,
          disabled: this.formControl.disabled,
          required: this.formControl.required,
          placeholder: this.placeholder,
          "aria-invalid": this.formControl.invalid,
        },
        on: {
          input: this.emitChange,
        },
      },
      this.$slots.default
    );
  },
};
