<template>
  <div class="container">
    <div id="content" :class="findshow ? 'blur' : ''">
      <div id="header">
        <headers @openfind="openfind" />
      </div>
    </div>
    <find @closepopup="closepopup" v-if="findshow" />
  </div>
</template>

<script>
import headers from "./home/homeheader.vue";
import find from "./home/find.vue";
export default {
  name: "home",
  data() {
    return {
      findshow: false,
    };
  },
  components: {
    headers,
    find,
  },
  methods: {
    openfind: function () {
      this.findshow = true;
    },
    closepopup: function () {
      this.findshow = false;
    },
  },
};
</script>

<style scoped>
.blur {
  filter: blur(3px);
}
</style>
