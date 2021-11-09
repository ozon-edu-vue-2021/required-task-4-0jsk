import styles from "./FormLayout.module.scss";
import { FormControl, Label, Input } from "@/common/components";

const renderPassportFields = (h, type) =>
  type === "russian" ? (
    <div class={styles.row}>
      <FormControl
        class={styles.field}
        scopedSlots={{
          default() {
            return (
              <fragment>
                <Label class={styles.label} title="Серия паспорта" />
                <Input />
              </fragment>
            );
          },
        }}
      />
      <FormControl
        class={styles.field}
        scopedSlots={{
          default() {
            return (
              <fragment>
                <Label class={styles.label} title="Номер паспорта" />
                <Input />
              </fragment>
            );
          },
        }}
      />
      <FormControl
        class={styles.field}
        scopedSlots={{
          default() {
            return (
              <fragment>
                <Label class={styles.label} title="Дата выдачи" />
                <Input />
              </fragment>
            );
          },
        }}
      />
    </div>
  ) : (
    <fragment>
      <div class={[styles.row, styles.partial]}>
        <FormControl
          class={styles.field}
          scopedSlots={{
            default() {
              return (
                <fragment>
                  <Label class={styles.label} title="Фамилия на латинице" />
                  <Input />
                </fragment>
              );
            },
          }}
        />
        <FormControl
          class={styles.field}
          scopedSlots={{
            default() {
              return (
                <fragment>
                  <Label class={styles.label} title="Имя на латинице" />
                  <Input />
                </fragment>
              );
            },
          }}
        />
        <p class={styles.description}>
          Иностраницы заполняют латинскими буквами. Например, Ivanov Ivan
        </p>
      </div>
      <div class={styles.row}>
        <FormControl
          class={styles.field}
          scopedSlots={{
            default() {
              return (
                <fragment>
                  <Label class={styles.label} title="Номер паспорта" />
                  <Input />
                </fragment>
              );
            },
          }}
        />
        <FormControl
          class={styles.field}
          scopedSlots={{
            default() {
              return (
                <fragment>
                  <Label class={styles.label} title="Страна выдачи" />
                  <Input />
                </fragment>
              );
            },
          }}
        />
        <FormControl
          class={styles.field}
          scopedSlots={{
            default() {
              return (
                <fragment>
                  <Label class={styles.label} title="Тип паспорта" />
                  <Input />
                </fragment>
              );
            },
          }}
        />
      </div>
    </fragment>
  );

const renderNameFields = (h, condition) =>
  condition ? (
    <div class={[styles.row, styles.partial]}>
      <FormControl
        class={styles.field}
        scopedSlots={{
          default() {
            return (
              <fragment>
                <Label class={styles.label} title="Имя" />
                <Input />
              </fragment>
            );
          },
        }}
      />
      <FormControl
        class={styles.field}
        scopedSlots={{
          default() {
            return (
              <fragment>
                <Label class={styles.label} title="Фамилия" />
                <Input />
              </fragment>
            );
          },
        }}
      />
    </div>
  ) : null;

export const FormLayout = {
  render(h) {
    return (
      <main class={styles.wrapper}>
        <section class={styles.content}>
          <h2>Личные данные</h2>
          <div class={styles.row}>
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label class={styles.label} title="Фамилия" />
                      <Input />
                    </fragment>
                  );
                },
              }}
            />
            <FormControl
              scopedSlots={{
                default() {
                  return (
                    <div class={styles.field}>
                      <Label class={styles.label} title="Имя" />
                      <Input />
                    </div>
                  );
                },
              }}
            />
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label class={styles.label} title="Отчество" />
                      <Input />
                    </fragment>
                  );
                },
              }}
            />
          </div>
          <div class={[styles.row, styles.birthday]}>
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label class={styles.label} title="Дата рождения" />
                      <Input />
                    </fragment>
                  );
                },
              }}
            />
          </div>
          <div class={[styles.row, styles.full]}>
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label class={styles.label} title="Дата рождения" />
                      <Input />
                    </fragment>
                  );
                },
              }}
            />
          </div>
          <div class={styles.row}>
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label title="Пол" class={styles.sub} />
                      <input type="checkbox" />
                      <input type="checkbox" />
                    </fragment>
                  );
                },
              }}
            />
          </div>
        </section>
        <section class={styles.content}>
          <h2>Паспортные данные</h2>
          <div class={styles.row}>
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label title="Гражданство" class={styles.label} />
                      <select />
                    </fragment>
                  );
                },
              }}
            />
          </div>
          {renderPassportFields(h, "rus1sian")}
          <div class={styles.row}>
            <FormControl
              class={styles.field}
              scopedSlots={{
                default() {
                  return (
                    <fragment>
                      <Label
                        class={styles.sub}
                        title="Меняли ли фамилию или имя?"
                      />
                      <input type="checkbox" />
                      <input type="checkbox" />
                    </fragment>
                  );
                },
              }}
            />
          </div>
          {renderNameFields(h, true)}
        </section>
        <button class={styles.submit} type="submit">
          отправить
        </button>
      </main>
    );
  },
};
