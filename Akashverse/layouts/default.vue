<template>
  <v-app dark>
    <v-alert
      justify="center"
      align="center"
      border="bottom"
      color="#1e9bff"
      dark>
      <h1 style="color: green; font-weight: 900; border-bottom: 1px solid green">Tez-Talk</h1><h3 style="color: greenyellow">A Decentralized way of thought sharing Social media dApp. Share your opinion to the world without worry about Censorship.</h3>Your data is fully secure in a <a style="color: purple" about="_blank" href="https://better-call.dev/ghostnet/KT1DwzJoHV3mZMEZybunYY83QbsRmekRK9yd/operations">smart contract</a> on the Ghostnet.
    </v-alert>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
  .link {
    text-decoration: none;
  }
</style>
