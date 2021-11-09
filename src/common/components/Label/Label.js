import styles from "./Label.module.scss";
import { injectFormContextMixin } from "@/common/mixins";

const props = {
  title: {
    type: String,
    required: true,
  },
};

// TODO: add htmlFor
export const Label = {
  name: "Label",
  mixins: [injectFormContextMixin],
  props,
  render(h) {
    return h(
      "label",
      {
        class: [styles.label, { [styles.disabled]: this.formControl.disabled }],
      },
      this.title
    );
  },
};
