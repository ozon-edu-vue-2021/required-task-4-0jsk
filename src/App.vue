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
                ref="lastname"
                :rules="rules.lastname"
                @focus="clearRules('lastname')"
                v-model="lastname"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Имя"
                required
                ref="firstname"
                :rules="rules.firstname"
                @focus="clearRules('firstname')"
                v-model="firstname"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Отчество"
                required
                ref="patronymic"
                :rules="rules.patronymic"
                @focus="clearRules('patronymic')"
                v-model="patronymic"
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
                ref="birthday"
                @focus="clearRules('birthday')"
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
                ref="email"
                @focus="clearRules('email')"
                v-model="email"
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
                ref="citizenship"
                @change="(v) => (citizenship = getCitizenshipOption(v))"
                :value="citizenship"
                no-filter
                :items="this.countries"
                :search-input.sync="searchInput"
              />
            </v-col>
          </v-row>
          <v-row v-if="!showForeignPassportInfo" class="mb-4">
            <v-col cols="4">
              <v-text-field
                label="Серия паспорта"
                required
                ref="code"
                @focus="clearRules('code')"
                :rules="rules.code"
                v-model="passport.code"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Номер паспорта"
                required
                ref="number"
                @focus="clearRules('number')"
                :rules="rules.number"
                v-model="passport.number"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                label="Дата выдачи"
                :rules="rules.date"
                v-mask="'##.##.####'"
                placeholder="дд.мм.гггг"
                required
                ref="date"
                v-model="passport.date"
              />
            </v-col>
          </v-row>
          <div v-show="showForeignPassportInfo" class="mb-4">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Фамилия на латинице"
                  @focus="clearRules('latinLastname')"
                  :rules="rules.latinLastname"
                  required
                  ref="latinLastname"
                  v-model="additional.lastname"
                />
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Имя на латинице"
                  @focus="clearRules('latinFirstname')"
                  :rules="rules.latinFirstname"
                  required
                  ref="latinFirstname"
                  v-model="additional.latinFirstname"
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
                  @focus="clearRules('number')"
                  :rules="rules.number"
                  required
                  ref="number"
                  v-model="passport.number"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  label="Страна выдачи"
                  @focus="clearRules('required')"
                  :rules="rules.required"
                  v-model="passport.country"
                  :items="this.countriesOptions"
                  ref="country"
                />
              </v-col>
              <v-col cols="4">
                <v-select
                  label="Тип паспорта"
                  @focus="clearRules('required')"
                  :rules="rules.required"
                  v-model="passport.type"
                  :items="this.passportTypesOptions"
                  ref="type"
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
                ref="changed.lastname"
                required
                v-model="changed.lastname"
              />
            </v-col>
            <v-col cols="6">
              <v-text-field
                label="Имя"
                required
                :rules="rules.required"
                ref="changed.firstname"
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
    const countriesOptions = citizenships.map((v) =>
      this.getCitizenshipOption(v)
    );

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
    showForeignPassportInfo() {
      return (
        Boolean(this.citizenship) &&
        Boolean(this.citizenship.value) &&
        this.citizenship.value.id === 8604
      );
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
    getCitizenshipOption(cit) {
      return {
        text: cit.nationality,
        value: cit,
      };
    },
    updateCitizenshipItemsDebounced() {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.updateCitizenshipItems();
      }, 500);
    },
    updateCitizenshipItems() {
      this.countries = this.countries.filter((v) =>
        v.text.toLowerCase().includes(this.searchInput.toLowerCase())
      );
    },
    submit() {
      const result = this.validate();

      const filteredData = Object.keys(this.$data)
        .filter((key) => !!this.$data[key])
        .reduce(
          (acc, key) => ({
            ...acc,
            [key]: this.$data[key],
          }),
          {}
        );

      if (result) {
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
        date: [
          (v) => !!v || "Обязательно для заполнения",
          () => isValid(this.decodedBirthday) || "Некорректная дата",
        ],
      };

      Object.keys(this.$refs).forEach((f) => {
        console.log(f);
        this.$refs[f].validate(true);
      });

      return !!Object.keys(this.valid).length && this.$refs.form.validate();
    },
    clearRules(key) {
      this.$delete(this.rules, key);
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  width: 1000px;
}
</style>
