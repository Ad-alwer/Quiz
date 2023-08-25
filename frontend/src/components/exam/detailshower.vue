vue
<template>
  <form id="popup">
    <div class="popup-inner rounded-4">
      <div>
        <font-awesome-icon
        icon="fa-solid fa-times"
        class="text-danger fs-5 iconclose"
        id="nameawesome"
       
      />
        <p class="text-center fw-bold fs-4">Detail</p>
      </div>
      <div>
        <table class="table">
          <thead>
            <tr>
              <th class="text-capitalize" scope="col">question</th>
              <th class="text-capitalize ps-3 "  scope="col">your answer</th>
              <th class="text-capitalize ps-3 "  scope="col">Correctanswer</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="x in answer" :key="x">
              <th class="text-capitalize ">{{ x.question }}</th>
              <th class="text-capitalize ps-4">{{ x.personanswer }}</th>
              <th class="text-capitalize ps-4">{{ x.correct }}</th>
              
            </tr>
            
          </tbody>
          <tfoot class="table-dark">
        <tr>
          <td class="text-center" colspan="3">{{mark}}%</td>
        </tr>
      </tfoot>
        </table>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "detailshower",
  props:['answer','mark'],
  mounted(){
    console.log(this.answer)
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
.iconclose{
    position: absolute;
    right: 20px;
    top:10px;
    cursor: pointer;
}
</style>
  
