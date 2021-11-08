import styles from "./FormLayout.module.scss";
import { FormControl, Label } from "@/common/components";

export const FormLayout = {
  render() {
    return (
      <main class={styles.wrapper}>
        <h2>Личные данные</h2>
        <section>
          <FormControl
            required
            scopedSlots={{
              default() {
                return (
                  <fragment>
                    <Label title="Фамилия" />
                    <input type="text" />
                  </fragment>
                );
              },
            }}
          />
        </section>
      </main>
    );
  },
};
