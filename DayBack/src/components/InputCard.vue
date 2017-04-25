<template>
  <div class="input-card">
    <md-card>
      <md-card-area>
        <md-card-header>
          <div class="md-title">Day Update</div>
          <div class="md-subhead">Dayback</div>
        </md-card-header>
        <form novalidate @submit.stop.prevent="submit">
          <div class="input-area">
            <md-input-container>
              <label>How are you doing?</label>
              <md-textarea maxlength="100" v-model="user_input.content"></md-textarea>
            </md-input-container>
            <div class="emoji-group">
              <a href="#" class="happy" @click.prevent="selectEmoji(4)"
                 :class="{'active' : user_input.mood === 4}"><img src="../assets/img/happy.png" alt=""></a>
              <a href="#" class="sulky" @click.prevent="selectEmoji(3)"
                 :class="{'active' : user_input.mood === 3}"><img src="../assets/img/sulky.png" alt=""></a>
              <a href="#" class="naughty" @click.prevent="selectEmoji(2)"
                 :class="{'active' : user_input.mood === 2}"><img src="../assets/img/naughty.png" alt=""></a>
              <a href="#" class="hungry" @click.prevent="selectEmoji(1)"
                 :class="{'active' : user_input.mood === 1}"><img src="../assets/img/hungry.png" alt=""></a>
            </div>
          </div>
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
      user_input: {
        author: this.authorID,
        content: '',
        mood: ''
      },
    }
  },
  // 수정시 입력 카드로 돌아갈 때 그 인풋창에 입력값 자체가 계속 넣어져 있는 것
  mounted () {
    console.log('user_input content : ', this.user_input.content);
    console.log('user_input mood : ', this.user_input.mood);
    console.log('todayItem content : ', this.todayItem.content);
    console.log('todayItem mood : ', this.todayItem.mood);

    if (this.todayItem && this.todayItem.content){
        this.user_input.content = this.todayItem.content;
    }
    if (this.todayItem && this.todayItem.mood){
        this.user_input.mood = this.todayItem.mood;
    }
  },
  methods: {
    selectEmoji(emoji) {
      this.user_input.mood = emoji;
    },
    createEmoji() {
      // 입력된 값이 없을 때 기본값 넣는 것 처리 필요
      this.user_input.author = this.authorID;

      if (this.user_input.mood === '') {
        window.alert('이모지를 선택하세요.');
        return;
      }

      if (this.isUpdate) {
        axios.put('https://dayback.hcatpr.com/api/post/' + this.todayItem.id + '/', this.user_input, {
          headers: {
            'Authorization': 'Token ' + this.$store.state.key
          }
        })
        .then (response => {
          this.$eventBus.$emit('changeComplete');
          window.alert('오늘의 감정이 수정되었습니다.')
        })
        .catch (e => {
          console.error('수정에 실패했습니다');
        })
      }
      else {
        axios.post('https://dayback.hcatpr.com/api/post/', this.user_input, {
          headers: {
            'Authorization': 'Token ' + this.$store.state.key
          }
        })
        .then(response => {
          this.$eventBus.$emit('changeComplete');
          window.alert('오늘의 감정이 기록되었습니다.');
        })
        .catch(e => {
          window.alert('입력에 실패했습니다');
        });
      }
    }
  }
}
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .input-card
    margin: 0 auto 60px
    width: 800px
    min-height: 450px

  .input-area
    display: block
    margin: 0 auto
    padding: 20px

  .emoji-group
    display: block
    text-align: center

  .md-card-header
    text-align: center

  .active
    opacity: 0.5

  img
    width: 150px
    height: 150px

</style>
