<!-- eslint-disable vue/require-v-for-key -->
<template>
  <form action="" id="popup">
    <div class="popup-inner">
      <div>
        <font-awesome-icon
          icon="fa-solid fa-times"
          class="text-danger fs-5"
          id="nameawesome"
          @click="close"
        />
      </div>
      <div class="d-flex mt-2">
        <input
          type="text"
          ref="searchinp"
          class="form-control"
          placeholder="Exam ID"
        />
        <div class="input-group-append ms-2">
          <span class="input-group-text" id="basic-addon2">
            <img
              src="../../assets/Imgs/search.png"
              class="py-1 imgicn"
              alt=""
              @click.prevent="search"
            />
          </span>
        </div>
      </div>

      <div>
        <div
          v-if="!searched"
          class="d-flex mt-3 flex-column justify-content-center"
        >
          <div class="text-center">
            <img
              src="../../assets/Imgs/empty.png"
              class="img-fluid imgempty"
              alt=""
            />
          </div>
          <h7 class="text-secondary mt-1 text-capitalize text-center"
            >Enter your exam ID in the search input</h7
          >
        </div>
        <div v-else>
          <div
            v-if="found"
            id="divresualt"
            class="d-flex justify-content-between align-content-center px-3 py-2 mt-5 rounded-3"
          >
            <div v-for="x in founddata" class="">
              <p class="text-capitalize fw-bold fs-3 pb-0 mb-0">{{ x.name }}</p>
              <span class="text-secondary fw-bold text-capitalize ms-2">{{
                x.autor["username"]
              }}</span>
            </div>
            <div class="d-flex justify-content-center m-1">
              <button class="bg-success py-2 px-3 btn text-white" @click="join">
                Join
              </button>
            </div>
          </div>
          <div v-else class="d-flex mt-3 flex-column justify-content-center">
            <div class="text-center">
              <img
                src="../../assets/Imgs/notfound.png"
                class="img-fluid imgempty"
                alt=""
              />
            </div>
            <h7 class="text-secondary mt-1 text-capitalize text-center"
              >Sorry,Your exam not found (Maybe it's closed)</h7
            >
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
import { info } from "../../../config/default";
let apiaddress = info.fetch["address"];

//   import Swal from "sweetalert2";

// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   didOpen: (toast) => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   },
// });

export default {
  name: "find",

  mounted() {
    document.addEventListener("keydown", this.keydown);
  },

  data() {
    return {
      correct: null,
      searched: false,
      found: null,
      founddata: [],
    };
  },
  components: {},
  methods: {
    search: function () {
      this.founddata = [];
      axios
        .get(`${apiaddress}search/${this.$refs.searchinp.value}`)
        .then((data) => {
          this.searched = true;

          if (data.data.status) {
            if (data.data.data.status == "open") {
              this.found = true;
              this.founddata.push(data.data.data);
              console.log(this.founddata);
            } else {
              this.found = false;
            }
          } else {
            this.found = false;
          }
        });
    },
    join: function () {
      let id = this.founddata[0]._id;
      location.href = `#/exam/${id}`;
    },
    close: function () {
      this.$emit("closepopup", "closed");
    },
    keydown: function (event) {
      if (event.key === "Escape") {
        this.close();
      } else if (event.key === "Enter") {
        this.search();
      }
    },
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
  }
}
input {
  width: 450px;

  box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
}

span {
  box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
  -webkit-box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 8px 36px -7px rgba(0, 0, 0, 0.5);
}

.imgicn {
  width: 20px;
  cursor: pointer;
}
.imgempty {
  width: 150px;
}
#nameawesome {
  position: absolute;
  right: 2%;
  top: 2%;
  cursor: pointer;
}
#divresualt {
  box-shadow: 1px 3px 37px -1px rgba(0, 0, 0, 0.55);
  -webkit-box-shadow: 1px 3px 37px -1px rgba(0, 0, 0, 0.55);
  -moz-box-shadow: 1px 3px 37px -1px rgba(0, 0, 0, 0.55);
}
</style>
