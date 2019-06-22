<template>
  <v-flex xs-8>
    <v-card>
        <v-layout column wrap>
          <v-flex xs-12 class="pa-2">
            <h1 class="text-xs-center">Przelicznik walut</h1>
          </v-flex>
          <v-divider light class="xs-12"></v-divider>
          <v-flex xs-12 class="pa-2">
            <v-form v-model="isValid">
              <v-layout row>
                <v-flex xs-3>
                  <v-text-field
                    type="number"
                    label="Wpisz ilość pieniędzy w PLN"
                    placeholder="Wpisz ilość"
                    v-model="inputValue"
                    :rules="currencyRule"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs-3>
                  <v-select
                    label="Wybierz walutę"
                    placeholder="Waluta"
                    v-model="selectedCurrency"
                    :items="selectOptions"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs-3>
                  <v-btn @click="calcCurrencies()" color="primary" flat>Oblicz!</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-flex>
          <v-flex xs-12>
            <h1
              v-if="showScore"
              class="text-xs-center"
            >{{ inputOldValue }} PLN to {{ score }} {{ selectedCurrency }}</h1>
          </v-flex>
        </v-layout>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Api from "@/api/api";

@Component({
  name: "Currency"
})
export default class App extends Vue {
  private api: any = null;
  private currencyRates: any = null;
  private apiError: boolean = false;
  private isValid: boolean = false;
  private showScore: boolean = false;
  private selectedCurrency: string = "";
  private inputValue: number = 0;
  private inputOldValue: number = 0;
  private score: string = "";
  private selectOptions = ["USD", "EUR", "GBP", "HUF", "CZK"];
  private currencyRule = [
    (v: number) => !!v || "To pole jest wymagane",
    (v: number) => !isNaN(v) || "Wartość musi być liczbą",
    (v: number) => v > 0 || "Wartość musi być większa, niż 0"
  ];
  constructor() {
    super();
    this.api = new Api();
  }

  calcCurrencies(): void {
    let vm = this;
    if (this.isValid) {
      this.inputOldValue = this.inputValue;
      const actualCurrencyValue = this.currencyRates.find(
        (c: any) => vm.selectedCurrency === c.code
      );
      this.score = (this.inputValue / actualCurrencyValue.mid).toFixed(2);
      this.showScore = true;
    }
  }

  async beforeMount() {
    try {
      const res = await this.api.getCurrency();
      this.currencyRates = res.data[0].rates;
    } catch (e) {
      this.apiError = true;
    }
  }
}
</script>
