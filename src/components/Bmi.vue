<template>
  <v-flex xs-8 class="ma-4">
    <v-card>
      <v-layout column wrap>
        <v-flex xs-12 class="pa-4">
          <h1 class="text-xs-center">Przelicznik BMI</h1>
        </v-flex>
        <v-divider light class="xs-12"></v-divider>
        <v-flex xs-12 class="pa-2">
          <v-form v-model="isValid">
            <v-layout row>
              <v-flex xs-4>
                <v-text-field
                  type="number"
                  label="Wpisz wzrost (w cm)"
                  placeholder="Wzrost"
                  v-model="height"
                  :rules="numberRule"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs-4>
                <v-text-field
                  type="number"
                  label="Wpisz wagę"
                  placeholder="Waga"
                  v-model="weight"
                  :rules="numberRule"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs-4>
                <v-btn color="primary" @click="calcBmi" flat>Oblicz!</v-btn>
              </v-flex>
            </v-layout>
            <v-flex xs-12>
              <h2 v-if="showScore">Twoje BMI to {{ score }}</h2>
            </v-flex>
          </v-form>
        </v-flex>
      </v-layout>
    </v-card>
  </v-flex>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  name: "Bmi"
})
export default class Bmi extends Vue {
  private sex: string = "m";
  private weight: number = 0;
  private isValid: boolean = false;
  private height: number = 0;
  private score: string = "";
  private showScore: boolean = false;
  private numberRule = [
    (v: number) => !!v || "To pole jest wymagane",
    (v: number) => !isNaN(v) || "Wartość musi być liczbą",
    (v: number) => v > 0 || "Wartość musi być większa, niż 0"
  ];

  calcBmi(): void {
    this.score = (this.weight / Math.pow(this.height / 100, 2)).toFixed(1);
    this.showScore = true;
  }
}
</script>
