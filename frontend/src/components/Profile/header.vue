<template>
  <header Id="parent" class="mt-3 d-flex justify-content-between">
    <div>
      <a href="#/profile"
        ><img
          class="img-tumbnail p-1 ms-5"
          src="../../assets/Imgs/profile.png"
          alt=""
        />
      </a>
      <a href="#/profile/exams">
        <img
        @click="change"
          src="../../assets/Imgs/quizresault.png"
          alt=""
          class="img-tumbnail p-1 ms-5"
        />
      </a>
      <a href="#/profile/created">
        <img
        @click="change"
          src="../../assets/Imgs/resault.png"
          alt=""
          class="img-tumbnail p-1 ms-5 imgs"
        />
      </a>
    </div>
    <div class="me-5">
      <a href="#/home">
        <img
          src="../../assets/Imgs/home.png"
          alt=""
          class="img-tumbnail p-1 imgs"
        />
      </a>
    </div>
  </header>
  <hr class="headerhr mx-4" />
</template>

<script>
export default {
  name: "Pheader",
  methods:{
    change:function(){
      this.$emit("change", 'changed');
    }
  }
  // Your component's logic here
};
</script>

<style scoped>
img {
  width: 40px;
  cursor: pointer;
}
.imgs {
  width: 50px;
}
.headerhr {
  border: 2px solid var(--dark-blue);
  box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
  -webkit-box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
  -moz-box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
}
</style>
