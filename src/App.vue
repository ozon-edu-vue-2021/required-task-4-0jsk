<template>
  <v-app>
    <v-main>
      <v-container>
        <v-form v-model="valid" ref="form" lazy-validation>
          <h2>Личные данные</h2>
          <v-row class="mb-4">
            <v-col cols="4">
              <v-text-field
                label="Фамилия"
                required
                validate-on-blur
                :rules="rules.lastname"
                v-model="lastname"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Имя"
                required
                validate-on-blur
                v-model="firstname"
                :rules="rules.firstname"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Отчество"
                required
                v-model="patronymic"
                :rules="rules.patronymic"
              />
            </v-col>
          </v-row>
          <v-row class="mb-4">
            <v-col cols="5">
              <v-text-field
                label="Дата рождения"
                v-mask="'##.##.####'"
                placeholder="дд.мм.гггг"
                required
                validate-on-blur
                :rules="rules.birthday"
                v-model="birthday"
              />
            </v-col>
          </v-row>
          <v-row class="mb-4">
            <v-col>
              <v-text-field
                label="E-mail"
                required
                v-model="email"
                validate-on-blur
                :rules="rules.email"
              />
            </v-col>
          </v-row>
          <v-row class="mb-4">
            <v-col>
              <h3>Пол</h3>
              <v-radio-group v-model="sex" row>
                <v-radio value="male" label="Мужской" />
                <v-radio value="female" label="Женский" />
              </v-radio-group>
            </v-col>
          </v-row>
          <h2>Паспортные данные</h2>
          <v-row class="mb-4">
            <v-col cols="5">
              <v-autocomplete
                label="Гражданство"
                :rules="rules.required"
                validate-on-blur
                v-model="citizenship"
                auto-select-first
                no-filter
                :items="this.countries"
                :search-input.sync="searchInput"
              />
            </v-col>
          </v-row>
          <v-row
            v-if="citizenship && citizenship.id && citizenship.id === 8604"
            class="mb-4"
          >
            <v-col cols="4">
              <v-text-field
                label="Серия паспорта"
                required
                validate-on-blur
                :rules="rules.code"
                v-model="passport.code"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Номер паспорта"
                required
                validate-on-blur
                :rules="rules.number"
                v-model="passport.number"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Дата выдачи"
                v-mask="'##.##.####'"
                placeholder="дд.мм.гггг"
                required
                v-model="passport.date"
              />
            </v-col>
          </v-row>
          <div v-else class="mb-4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Фамилия на латинице"
                  :rules="rules.latinLastname"
                  validate-on-blur
                  required
                  v-model="additional.firstname"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Имя на латинице"
                  :rules="rules.latinFirstname"
                  validate-on-blur
                  required
                  v-model="additional.lastname"
                />
              </v-col>
            </v-row>
            <p class="caption">
              Иностранцы заполняют поля латинскими буквами. Например, Ivanov
              Ivan.
            </p>
            <v-row class="mb-4">
              <v-col cols="4">
                <v-text-field
                  label="Номер паспорта"
                  validate-on-blur
                  :rules="rules.number"
                  required
                  v-model="passport.number"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  label="Страна выдачи"
                  :rules="rules.required"
                  validate-on-blur
                  v-model="passport.country"
                  :items="this.countriesOptions"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  label="Тип паспорта"
                  :rules="rules.required"
                  validate-on-blur
                  v-model="passport.type"
                  :items="this.passportTypesOptions"
                />
              </v-col>
            </v-row>
          </div>
          <v-row>
            <v-col>
              <h3>Меняли ли фамилию или имя?</h3>
              <v-radio-group v-model="nameChanged" row>
                <v-radio :value="false" label="Нет" />
                <v-radio :value="true" label="Да" />
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row v-if="nameChanged" class="mb-4">
            <v-col cols="6">
              <v-text-field
                label="Фамилия"
                :rules="rules.required"
                validate-on-blur
                required
                v-model="changed.lastname"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Имя"
                validate-on-blur
                required
                :rules="rules.required"
                v-model="changed.firstname"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col align="end">
              <v-btn color="primary" @click="submit">Оправить</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passportTypes from "@/assets/data/passport-types.json";
import {
  cyrillicRegex,
  emailRegex,
  latinRegex,
  numbersRegex,
} from "@/common/utils/regex";
import { isAfter, isValid, parse, startOfToday } from "date-fns";

export default {
  name: "App",
  created() {
    const countriesOptions = citizenships.map((v) => ({
      text: v.nationality,
      value: v,
    }));

    const passportTypesOptions = passportTypes.map((v) => ({
      text: v.type,
      value: v,
    }));

    this.countriesOptions = countriesOptions;
    this.countries = countriesOptions;
    this.passportTypesOptions = passportTypesOptions;

    this.citizenship = countriesOptions[0];
  },
  data: () => ({
    lastname: "",
    firstname: "",
    patronymic: "",
    birthday: "",
    email: "",
    sex: "male",
    citizenship: null, // Russia
    passport: {
      code: "",
      number: "",
      date: "",
      country: null,
      type: null,
    },
    additional: {
      // в случае нерусского паспорта
      firstname: "",
      lastname: "",
    },
    changed: {
      firstname: "",
      lastname: "",
    },
    nameChanged: false,
    rules: {},
    valid: false,
    searchInput: "",
    timeout: null,
    countries: [],
  }),
  computed: {
    decodedBirthday() {
      return parse(this.birthday, "dd.MM.yyyy", new Date());
    },
  },
  watch: {
    searchInput(v) {
      if (!v) {
        this.countries = this.countriesOptions;
        return;
      }

      this.updateCitizenshipItemsDebounced();
    },
  },
  methods: {
    updateCitizenshipItemsDebounced() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        console.log("here");
        this.updateCitizenshipItems();
      }, 2500); /* 500ms throttle */
    },
    updateCitizenshipItems() {
      this.countries = this.countries.filter((v) =>
        v.text.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
    submit() {
      this.validate();

      const filteredData = Object.keys(this.$data)
        .filter((key) => !!this.$data[key])
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: this.$data[key],
          }),
          {}
        );

      if (
        this.firstname &&
        this.lastname &&
        this.patronymic &&
        this.email &&
        this.decodedBirthday &&
        this.sex &&
        this.citizenship &&
        this.passport.number
      ) {
        console.log({
          result: { ...filteredData, birthday: this.decodedBirthday },
        });
      }
    },
    validate() {
      this.rules = {
        lastname: [
          (v) => !!v || "Фамилия обязательна для заполнения",
          (v) => cyrillicRegex.test(v) || "Только кириллица",
        ],
        firstname: [
          (v) => !!v || "Имя обязательно для заполнения",
          (v) => cyrillicRegex.test(v) || "Только кириллица",
        ],
        patronymic: [
          (v) => !!v || "Отчество обязательно для заполнения",
          (v) => cyrillicRegex.test(v) || "Только кириллица",
        ],
        birthday: [
          (v) => !!v || "Дата рождения обязательна для заполнения",
          () => isValid(this.decodedBirthday) || "Некорректная дата",
          () =>
            !isAfter(this.decodedBirthday, startOfToday()) ||
            "Не позже сегодняшнего дня",
        ],
        email: [
          (v) => !!v || "E-mail обязателен для заполнения",
          (v) => emailRegex.test(v) || "Некорректный E-mail",
        ],
        code: [
          (v) => !!v || "Серия паспорта обязательна для заполнения",
          (v) => numbersRegex.test(v) || "Только цифры",
          (v) =>
            this.citizenship?.id === 8604
              ? v?.length === 4 ||
                "Длина серии паспорта должна составлять 4 цифры"
              : true,
        ],
        number: [
          (v) => !!v || "Номер паспорта обязателен для заполнения",
          (v) => numbersRegex.test(v) || "Только цифры",
          (v) =>
            this.citizenship?.id === 8604
              ? v?.length === 6 ||
                "Длина серии паспорта должна составлять 6 цифр"
              : true,
        ],
        latinLastname: [
          (v) => !!v || "Фамилия обязательна для заполнения",
          (v) =>
            latinRegex.test(v) ||
            "Фамилия должна содержать только латинские буквы",
        ],
        latinFirstname: [
          (v) => !!v || "Имя обязательно для заполнения",
          (v) =>
            latinRegex.test(v) || "Имя должно содержать только латинские буквы",
        ],
        required: [(v) => !!v || "Обязательно для заполнения"],
      };

      this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
}
</style>
