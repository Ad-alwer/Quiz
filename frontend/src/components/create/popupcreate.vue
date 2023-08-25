<!-- eslint-disable vue/require-v-for-key -->
<template>
  <form id="popup">
    <div class="popup-inner">
      <div>
        <input
          type="text"
          placeholder="Write your question"
          class="text-capitalize form-control border border-2"
          ref="questioninp"
        />
      </div>
      <div class="d-flex gap-2 mt-3">
        <div>
          <input
            type="text"
            placeholder="option 1"
            ref="option1"
            class="btn text-capitalize form-control border border-2"
            @dblclick.prevent="answer(1)"
          />
          <input
            type="text"
            placeholder="option 3"
            ref="option3"
            class="btn text-capitalize form-control border border-2 mt-2"
            @dblclick.prevent="answer(3)"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="option 2"
            ref="option2"
            class="btn text-capitalize form-control border border-2"
            @dblclick.prevent="answer(2)"
          />
          <input
            type="text"
            placeholder="option 4"
            ref="option4"
            class="btn text-capitalize form-control border border-2 mt-2"
            @dblclick.prevent="answer(4)"
          />
        </div>
      </div>
      <p class="mt-3 mb-0 text-capitalize fw-bold text-secondary">
        Please double click on correct answer
      </p>
      <div class="d-flex justify-content-center mt-3">
        <button class="btn btn-primary me-5 py-2 px-3" @click="save">
          Save
        </button>
        <button class="btn btn-secondary py-2 px-3" @click="close">
          Cancel
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export default {
  name: "popupcreate",

  mounted() {
    document.addEventListener("keydown", this.esc);
  },

  data() {
    return {
      correct: null,
    };
  },
  components: {},
  methods: {
    answer: function (option) {
      let options = ["option1", "option2", "option3", "option4"];
      let answer = `option${option}`;
      let item = this.$refs[answer];
      let index = options.findIndex((e) => {
        return e == answer;
      });
      options.splice(index, 1);

      options.forEach((e) => {
        this.$refs[e].style.backgroundColor = "#fff";
      });
      item.style.backgroundColor = "#66bb6a";

      this.correct = this.$refs[answer].value;
    },
    save: function () {
      if (
        this.correct &&
        this.$refs.questioninp.value &&
        this.$refs.option1.value &&
        this.$refs.option2.value &&
        this.$refs.option3.value &&
        this.$refs.option4.value
      ) {
        if (
          this.$refs.option1.value == this.$refs.option2.value ||
          this.$refs.option1.value == this.$refs.option3.value ||
          this.$refs.option1.value == this.$refs.option4.value ||
          this.$refs.option2.value == this.$refs.option3.value ||
          this.$refs.option2.value == this.$refs.option4.value ||
          this.$refs.option3.value == this.$refs.option4.value
        ) {
          Toast.fire({
            icon: "error",
            title: `Your Options Are Same`,
          });
        } else {
          Toast.fire({
            icon: "success",
            title: `Your Question Saved `,
          });
          let newquestion = {
            Question: this.$refs.questioninp.value,
            Option1: this.$refs.option1.value,
            Option2: this.$refs.option2.value,
            Option3: this.$refs.option3.value,
            Option4: this.$refs.option4.value,
            answer: this.correct,
          };

          this.$emit("save", newquestion);
        }
      } else {
        Toast.fire({
          icon: "error",
          title: `Please Fill All Inputs`,
        });
      }
    },
    close: function () {
      this.$emit("closepopup", "closed");
    },
    esc(event) {
      if (event.key === "Escape") {
        this.close();
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
.form-control:focus {
  outline: none;
  box-shadow: none;
}
</style>
