<template >
  <header Id="parent" class=" mt-3 d-flex justify-content-between">
   
    <div>
      <img
        class="img-tumbnail p-1 ms-5"
        src="../../assets/Imgs/profile.png"
        alt=""
      />
      <img
        src="../../assets/Imgs/quizresault.png"
        alt=""
        class="img-tumbnail p-1 ms-5"
      />
      <img
        src="../../assets/Imgs/resault.png"
        alt=""
        class="img-tumbnail p-1 ms-5 imgs"
      />
    </div>
    <div class="me-5">
      <img src="../../assets/Imgs/home.png" alt="" class="img-tumbnail p-1 imgs " />
    </div>
  </header>
  <hr class="headerhr mx-4">
</template>

<script>
export default {
  name: "Pheader",
  // Your component's logic here
};
</script>

<style scoped>
img{
  width: 40px;
  cursor: pointer;
}
.imgs{
  width: 50px;
}
.headerhr{
  
  border: 2px solid var(--dark-blue);
  box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
  -webkit-box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
  -moz-box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);

}
</style>
