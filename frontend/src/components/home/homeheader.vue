<template>
  <nav id="parent" class="mt-3">
    <div id="profile" class="me-5">
      <a class="me-4" href="#/profile"
        ><img
          class="img-tumbnail rounded-circle p-1"
          src="../../assets/Imgs/profile.png"
          alt=""
      /></a>
    </div>
    <div id="btn" class="">
      <a class="ms-5 ps-3" href="#/createexam"
        ><img
          id="img-add"
          class="img-tumbnail rounded-circle p-1"
          src="../../assets/Imgs/add.png"
          alt=""
      /></a>
      <a class="ms-5" 
        ><img
          id="img-search"
          class="img-tumbnail rounded-circle  p-1"
          src="../../assets/Imgs/search.png"
          alt=""
          @click="search"
      /></a>
    </div>
  </nav>
  <hr id="headerhr" class="mx-5 rounded" />
</template>

<script>
export default {
  name: "header",
  methods:{
    search:function(){
      this.$emit("openfind", "open");
    }
  }
}
</script>

<style scoped>
#parent {
  height: 50px;
}
#profile {
  float: right;
}
#profile a img {
  width: 50px;
  height: 50px;
  /* border: 2px solid #8b89f163; */
}
#img-search {
  width: 45px;
}
#img-add {
  width: 42px;
}
#headerhr {
  border: 2px solid var(--dark-blue);
  box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
  -webkit-box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
  -moz-box-shadow: 0px 4px 11px 6px rgba(119, 106, 186, 0.78);
}
img{
  cursor: pointer;
}
</style>
