<template>
  <form id="popup" >
    <div class="popup-inner rounded-4">
      <input
        type="text"
        class="form-control text-center px-3"
        readonly
        value="Name"
      />
      <div>
        <div class="d-flex gap-5">
          <div class="mt-3 me-3">
            <p class="fw-medium pcorrect">Correct : {{ correct }}</p>
            <p class="fw-medium">Number of questions : {{ hmquestion }}</p>
          </div>
          <div class="progress-circle__container">
            <span class="progress-circle__percent fs-4">{{ percent }}%</span>

            <svg
              class="progress-circle"
              viewBox="0 0 106 106"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g
                id="Page-1"
                stroke="none"
                stroke-width="1"
                fill="none"
                fill-rule="evenodd"
              >
                <g
                  id="ProgressBar"
                  transform="translate(-17.000000, -17.000000)"
                >
                  <circle
                    id="Oval"
                    stroke="#949494"
                    stroke-width="5"
                    fill-rule="nonzero"
                    cx="70"
                    cy="70"
                    r="50"
                  ></circle>
                  <path
                    class="progress-circle__path"
                    d="M70,120 C97.6142375,120 120,97.6142375 120,70 C120,42.3857625 97.6142375,20 70,20 C42.3857625,20 20,42.3857625 20,70 C20,97.6142375 42.3857625,120 70,120 Z"
                    id="Oval-Copy"
                    stroke="#008080"
                    stroke-width="5"
                    :stroke-dasharray="circle"
                    fill-rule="nonzero"
                    transform="translate(70.000000, 70.000000) rotate(-125.000000) translate(-70.000000, -70.000000) "
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center gap-3">
        <img class="img-fluid" @click.prevent="Home" src="../../assets/Imgs/home.png" />
        <img class="img-fluid" @click.prevent="detail" src="../../assets/Imgs/information.png" />
      </div>
    </div>
  </form>
  <detailshower :answer="answer" :mark="percent" />
</template>

<script>
import detailshower from "./detailshower.vue"
export default {

  
  name: "detail",
  components: {
    detailshower
  },
  computed: {
    circle() {
      return (this.percent / 100) * 100 * Math.PI + ",9999";
    },
  },
  data() {
    return {
      // percent: null,
      // correct: null,
      // hmquestion: null,
    };
  },
  props:['percent','correct','hmquestion','answer'],
  methods:{
    home:function(){
      location.href='#/home'
    },
    detail:function(){
      console.log(this.answer)
    }
  }
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
  }
}
.form-control:focus {
  outline: none;
  box-shadow: none;
}
.progress-circle {
  max-width: 100px;
  max-height: 100px;
  width: 100%;
  transform: scaleX(-1) rotate(-55deg);
}
.progress-circle__percent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.progress-circle__container {
  display: inline-block;
  position: relative;
  scale: 0.75;
}

.progress-circle__path {
  transition: 0.5s ease-in-out all;
}

.container {
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.progress-circle:hover {
  cursor: pointer;

  transition: 0.25s linear background;
}
@media screen and (min-width: 500px) {
  .container {
    flex-direction: row;
  }
}
.pcorrect {
  color: rgb(7, 175, 139);
}
img {
  width: 50px;
  cursor: pointer;
}
input[type="text"] {
  cursor: pointer;
}
</style>
