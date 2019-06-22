<template>
  <v-app>
    <v-container fluid>
      <v-layout column align-center justify-center fill-height>
        <currency />
        <bmi />
      </v-layout>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Api from './api/api';
import Currency from '@/components/Currency.vue'
import Bmi from '@/components/Bmi.vue'

@Component({
  components: {
    Currency,
    Bmi
  }
})
export default class App extends Vue {}
</script>
