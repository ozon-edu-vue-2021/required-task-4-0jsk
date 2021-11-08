import styles from "./Label.module.scss";
import { formControlProps } from "@/common/utils/Form";

export const Label = {
  name: "Label",
  props: {
    ...formControlProps,
    title: {
      type: String,
      required: true,
    },
  },
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
  render(h) {
    return h(
      "label",
      {
        class: [styles.label, { [styles.disabled]: this.formControl.disabled }],
      },
      [`${this.title}${this.formControl.required ? "*" : ""}`]
    );
  },
};
