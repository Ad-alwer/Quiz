<template>
  <div class="container">
    <div id="content" :class="findshow ? 'blur   ' : ''">
      <div id="header">
        <headers @openfind="openfind" />
        <div class="d-flex justify-content-center flex-column  gap-5 mt-5">
         <div class="d-flex justify-content-center">
          <div class="rounded-4 img-search" @click="openfind">
            <img
              class="img-fluid imgs"
              src="../assets/Imgs/searchexam.png"
              alt=""
            />
            <span class="align-middle ms-5 ps-2 fs-4 fw-bold text-capitalize"
              >find exam</span
            >
          </div>
         </div>
        <div class="d-flex justify-content-center">
          <div class="rounded-4 img-find" @click="createexam">
            <img
              class="img-fluid imgs"
              src="../assets/Imgs/findexam.png"
              alt=""
            />
            <span class="align-middle ms-5 ps-2 fs-4 fw-bold text-capitalize"
              >create exam</span
            >
          </div>
        </div>
        </div>
        
      </div>
    </div>
    <find @closepopup="closepopup" v-if="findshow" />
  </div>
</template>

<script>
import headers from "./home/homeheader.vue";
import find from "./home/find.vue";
// import lastshow from "./Profile/lastshower.vue";
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
    createexam: function () {
      location.href = "#/createexam";
    },
  },
};
</script>

<style scoped>
.blur {
  filter: blur(3px);
}
.imgs {
  width: 130px;
}
.img-find {
  width:400px;
  background-color: #28a2cf;
  color: white;
  cursor: pointer;
}
.img-search {
  width: 400px;
  background-color: #854cbb;
  color: white;
  cursor: pointer;
}
</style>
