<template>
  <div id="popup">
    <div class="popup-inner rounded-4">
      <div class="d-flex">
        <input
          type="text"
          class="form-control border-black border-1 px-2 py-2 d-inline"
          disabled
          :value="url"
        />
        <font-awesome-icon
          class="btn icon-brand rounded-circle p-1 d-inline mt-2 mx-0 p"
          icon="fa-soli fa-share"
          v-if="shareshow"
          @click="share"
          id="share"
        />
        <font-awesome-icon
          class="btn icon-brand rounded-circle p-1 d-inline mt-2 mx-0 p"
          icon="fa-solid fa-copy"
          @click="copy"
          id="copy"
        />
      </div>
      <div class="d-flex mt-5 justify-content-center">
        <div class="">
          <ShareNetwork
            network="facebook"
            :url="url"
            :title="examname"
            :description="desc"
          >
            <img
              src="../../assets/Imgs/facebook-.png"
              alt=""
              class="img img-fluid"
            />
          </ShareNetwork>
        </div>
        <div class="ms-3">
          <ShareNetwork
            network="twitter"
            :url="url"
            :title="examname"
            :description="desc"
          >
            <img
              src="../../assets/Imgs/twitter.png"
              alt=""
              class="img img-fluid"
            />
          </ShareNetwork>
        </div>
        <div class="ms-3">
          <ShareNetwork
            network="telegram"
            :url="url"
            :title="examname"
            :description="desc"
          >
            <img
              src="../../assets/Imgs/telegram.png"
              alt=""
              class="img img-fluid"
            />
          </ShareNetwork>
        </div>
      </div>
      <div class="mt-4 d-flex justify-content-center align-content-center">
       <img src="../../assets/Imgs/home.png" class="img img-fluid" @click="gotohome" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "share",
  beforeMount() {
    if (navigator.share) {
      this.shareshow = true;
    } else {
      this.shareshow = false;
    }
  },
  data() {
    return {
      shareshow: null,
      desc:`${this.creatername} create exam for you,hurry up and click on the link before the exam is over.We wish best for you `
    };
  },
  props: ["url","examname","creatername"],
  methods: {
    copy: function () {
      navigator.clipboard.writeText(this.url);
    },
    share: function () {
      navigator.share({
        text: "Click on link and join the exam",
        url: this.url,
        title: "Your exam link",
      });
    },
    gotohome:function(){
      location.href="#/home"
    }
  },
};
</script>

<style scoped>
#popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;

  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;

  .popup-inner {
    background-color: white;
    color: black;
    position: relative;
    padding: 28px;
    max-height: 720px;
    border: 3px solid black;
    box-shadow: 0px 12px 21px -2px rgba(0, 0, 0, 0.75);
    -webkit-box-shadow: 0px 12px 21px -2px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 12px 21px -2px rgba(0, 0, 0, 0.75);
  }
}
input {
  width: 450px;
  box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
}
#share {
  position: absolute;
  right: 65px;
}
#copy {
  position: absolute;
  right: 35px;
}
.img {
  height: 60px;
  cursor: pointer;
}
</style>
