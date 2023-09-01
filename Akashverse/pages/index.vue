<template>
  <div class="background-container">
  <v-row justify="center" align="center" color="#69ff3e">
    <v-col cols="12" sm="8" md="6" :loading="loading">
      <v-alert v-if="error" dismissible type="error">
        {{ error }}
      </v-alert>
      <v-alert v-if="confirming" type="info" color="black">
        Waiting to include the operation on the blockchain...
      </v-alert>
      <div v-if="!sending">
        <v-textarea
          v-model="message" 
          counter
          no-resize
          rows="5"
          label="Tweet"
          :rules="[v => (v == '' || v.length >= 10) || 'Tweet must be atleast 10 characters', v => v.length <= 280 || 'Tweet must be less than 281 characters']"
          outlined>
        </v-textarea>
        <v-btn class="primary" @click="submit">
          Submit
        </v-btn>
      </div>
      <v-progress-circular
              v-else
              size="100"
              class="mt-2"
              color="primary"
              indeterminate />
      <br>
      <v-divider></v-divider>
     <v-progress-circular
        v-if="loading"
        size="100"
        class="mt-2"
        color="primary"
        indeterminate />
      <v-card class="mt-2">
        <v-card-title>Tweets</v-card-title>
        <v-card-text>
          <v-timeline align-top dense>
            <v-timeline-item v-for="(x, idx) in entries" :key="idx" small>
              <div>
                <div class="font-weight-normal">
                  <strong>{{ x.author }}</strong> <small>@{{ x.date }}</small>
                </div>
                <div v-html="x.entry" />
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
      </v-progress-circular>
    </v-col>
  </v-row>
</div>
</template>

<script>
import { TezosToolkit } from '@taquito/taquito'
import { BeaconWallet } from '@taquito/beacon-wallet'
import { formatRelative } from 'date-fns'

const contractAddress = 'KT1DwzJoHV3mZMEZybunYY83QbsRmekRK9yd'
const rpc_addr = 'https://ghostnet.smartpy.io'
const network = 'ghostnet'

function escapeHtml (unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

export default {
  components: {
  },
  data () {
    return {
      loading: true,
      sending: false,
      confirming: false,
      entries: [],
      author: '',
      message: '',
      error: null
    }
  },
  mounted () {
    this.Tezos = new TezosToolkit(rpc_addr)
    this.refresh()
  },
  methods: {
    async refresh () {
      // Contract API
      this.loading = true
      this.error = null
      this.contract = await this.Tezos.contract.at(contractAddress)
      const storage = await this.contract.storage()
      // "zip" the three storage arrays together into objects
      const data = storage.authors.map(function (author, i) {
        return {
          author,
          entry: escapeHtml(storage.entries[i]).replace('\n', '<br>'),
          date: formatRelative(new Date(storage.dates[i]), new Date())
        }
      })
      this.entries = data
      this.loading = false
    },
    async submit () {
      if (this.message.length < 10 || this.message.length > 280) { return }
      this.error = null
      const walletOptions = {
        name: 'Tez-Talk'
      }
      const wallet = new BeaconWallet(walletOptions)

      try {
        await wallet.requestPermissions({
          network: {
            type: network,
            rpcUrl: rpc_addr
          }
        })
      } catch (e) {
        this.error = e.description
        return
      }
      const userAddress = await wallet.getPKH()

      this.Tezos.setProvider({ wallet })

      // wallet API
      const contract = await this.Tezos.wallet.at(contractAddress)

      this.sending = true
      let operation
      try {
        operation = await (contract.methods.default(
          // parameter order should match the entrypoint in the smart contract
          userAddress,
          this.message
        ).send())
      } catch (e) {
        this.error = e.description
        this.sending = false
        return
      }
      this.sending = false

      this.confirming = true
      const opResult = await operation.confirmation()
      this.confirming = false
      if (opResult.completed) {
        this.author = ''
        this.message = ''
        this.refresh()
      } else {
        this.error = 'An error has occurred'
      }
    }
  }
}
</script>

<!-- <style scoped>
        background-image: url('winter.png');
        background-position: center center;
        background-repeat:  no-repeat;
        background-attachment: fixed;
        background-size:  cover;
</style> -->

<style scoped>
.background-container {
  /* Use the URL of your background image */
  background-image: url('./lake.png');
  background-size: cover; /* Adjust as needed */
  background-position: center;
  background-repeat:  no-repeat;
  background-attachment: fixed; /* Adjust as needed */
}
</style>
