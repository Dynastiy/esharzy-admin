<template>
  <div id="app">
    <vue-topprogress  ref="topProgress"></vue-topprogress>
    <router-view/>
  </div>
</template>

<style>

</style>


<script>
import { vueTopprogress } from 'vue-top-progress'
export default {
  components: {
    vueTopprogress
  },
   mounted () {
    this.$refs.topProgress.start()

    // Use setTimeout for demo
    setTimeout(() => {
      this.$refs.topProgress.done()
    }, 2000)
  }
}
</script>
