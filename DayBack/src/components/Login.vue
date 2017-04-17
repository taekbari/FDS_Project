<template>
  <div class="login">
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
      showModal: false
    }
  },
  components: {
    Modal
  },
  created() {
    this.$eventBus.$on('showSignInPopup', this.showSignInPopup);
  },
  methods: {
    showSignInPopup() {
      this.showModal = true;
    }
  }
}
</script>

<style lang="sass">

.login
  margin: 1rem

</style>
