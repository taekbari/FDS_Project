<template>
  <div class="input-card">
    <md-card>
      <md-card-area>
        <md-card-header>
          <div class="md-title">Day Update</div>
          <div class="md-subhead">Dayback</div>
        </md-card-header>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container class="input-area">
            <md-input-container>
              <label>How are you doing?</label>
              <md-textarea maxlength="100" v-model="userInput.content"></md-textarea>
            </md-input-container>
            <div class="emoji-group">
              <a href="#" class="happy" @click.prevent="selectEmoji(4)"
                 :class="{'active' : userInput.mood === 4}"><img src="../assets/img/happy.png" alt=""></a>
              <a href="#" class="sulky" @click.prevent="selectEmoji(3)"
                 :class="{'active' : userInput.mood === 3}"><img src="../assets/img/sulky.png" alt=""></a>
              <a href="#" class="naughty" @click.prevent="selectEmoji(2)"
                 :class="{'active' : userInput.mood === 2}"><img src="../assets/img/naughty.png" alt=""></a>
              <a href="#" class="hungry" @click.prevent="selectEmoji(1)"
                 :class="{'active' : userInput.mood === 1}"><img src="../assets/img/hungry.png" alt=""></a>
            </div>
          </md-input-container>
        </form>

        <md-card-actions>
          <md-button @click.native="createEmoji">Post</md-button>
        </md-card-actions>
      </md-card-area>
    </md-card>
  </div>
</template>

<script>
import axios from 'axios';

  export default {
    name: 'input-card',
    props:['todayItem', 'authorID', 'isUpdate'],
    data () {
      return {
        userInput: {
          // 수정시 이미 들어온 값을 설정
          author: this.authorID,
          mood: '',
          content: '',
          // author: 0,
          // mood: '',
          // content: '',
        }
      }
    },
    mounted() {
      console.log('mounted this.todayItem', this.todayItem)
      // 두번 실행됨(뿌려줄 때 다시 한 번)
      if(this.todayItem && this.todayItem.content) {
        this.userInput.content = this.todayItem.content;
      } 
      if(this.todayItem && this.todayItem.mood) {
        this.userInput.mood = this.todayItem.mood;
      } 
    },
    methods: {
      selectEmoji(mood) {
        this.userInput.mood = mood;
        console.log(mood);
      },
      createEmoji() {
        if(this.isUpdate) {
          // 글 수정
          axios.put('https://dayback.hcatpr.com/post/' + this.todayItem.id + '/', this.userInput, {
            headers: {
                'Authorization': 'Token ' + this.$store.state.key
            }
          })
          .then(response => {
            console.log(response);
            window.alert('오늘의 감정이 수정되었습니다.')
            this.component_selected = '';
            this.$eventBus.$emit('changeComplete');
          })
          .catch(error => console.error(error.message));
        } else {
          // 글 입력
          // mounted 됐을 때 author 값이 기본값 0으로만 세팅되므로 props에 있는 값으로 사용한다.
          this.userInput.author = this.authorID;
          // axios.post('url', [data], [config]]
          axios.post('https://dayback.hcatpr.com/post/', this.userInput, {
            headers: {
                'Authorization': 'Token ' + this.$store.state.key
            }
          })
          .then(response => {
            window.alert('오늘의 감정이 기록되었습니다.');
            this.$eventBus.$emit('changeComplete');
            console.log(response);
          })              
          .catch(error => console.error(error.message));
        }
      }
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .input-card
    margin: 0 auto 60px
    width: 800px
    min-height: 400px

  .input-area
    display: block
    margin: 0 auto
    padding: 20px

  .emoji-group
    display: block

  .active
    opacity: 0.5

  img
    width: 150px
    height: 150px

</style>
