<template>
  <div class="login">
    <!--로그인 모달 창을 띄우고 없애는 modal 처리 컴포넌트.-->
    <button 
      class="button is-danger is-outlined"
      id="show-modal"
      @click="showModal = true">로그인 화면 띄우기
    </button>
    <modal
      class="modal-template" 
      v-if="showModal"
      @closeModal="showModal = false"
    ></modal>
  </div>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Hello Vue, I just started :)',
      showModal: false,
      flipModal: false
    }
  },
  components: {
    Modal
}
}
</script>

<style lang="sass">

.login
  margin: 1rem

</style>
