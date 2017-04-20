<template>
  <div id="member">
    <div class="flex-wrapper">
      <transition enter-active-class="animated flipInY" leave-active-class="animated flipOutY" duration="450"
                  mode="out-in" appear>
        <component @changeDailyCard="changeDailyView"
                   :todayItem="todayItem"
                   :authorID="authorID"
                   :is-update="isUpdate"
                   :is="component_selected">
        </component>
      </transition>
      <week :weeklyItems="weeklyItems"></week>
    </div>
  </div>
</template>

<script>
  import InputCard from './InputCard.vue'
  import Today from './Today.vue'
  import Week from './Week.vue'
  import moment from 'moment/moment'
  import axios from 'axios';

  export default {
    name: 'main',
    data () {
      return {
          // 오늘 아이템
        todayItem: {},
          // 주간 아이템
        weeklyItems : [],
          // 사용자 아이디 (토큰값)
        authorID: 0,
        component_selected: 'input-card',
        isUpdate : false
      }
    },
    components: {
      InputCard,
      Today,
      Week
    },
    methods: {
      setEmojiAndColor(){
          let index, length;
          length = this.weeklyItems.length;

          for (index=0; index < length; index++) {
              let emoji = this.weeklyItems[index].mood;
              let color = '';

              switch (emoji) {
                  case 4:
                      this.weeklyItems[index].emojiSrc = require('../assets/img/happy.png');
                      color = 'happy';
                      break;

                  case 3:
                      this.weeklyItems[index].emojiSrc = require('../assets/img/sulky.png');
                      color = 'sulky';
                      break;

                  case 2:
                      this.weeklyItems[index].emojiSrc = require('../assets/img/naughty.png');
                      color = 'naughty';
                      break;

                  case 1:
                      this.weeklyItems[index].emojiSrc = require('../assets/img/hungry.png');
                      color = 'hungry';
                      break;
              }
              this.weeklyItems[index].matchingColor = color;
          }
      },
      fetchDailyAndWeeklyEmojis() {
          // axios 통신 호출
          // 사용자 정보 가져오기
          axios.get('https://dayback.hcatpr.com/user/', {
              headers: {
                  'Authorization': 'Token ' + this.$store.state.key
              }
          }).then(response=>{
              // 성공시 처리
              // 서버에서 받아온 사용자 정보의 ID값을 authorID에 할당
              console.log(response);
              this.authorID = response.data.results[0].id;
          }).catch(e=>{
              window.alert('사용자 정보를 가져오는데 실패했습니다');
          });

          // 글 목록 가져오기
          axios.get('https://dayback.hcatpr.com/post/', {
              headers: {
                  'Authorization': 'Token ' + this.$store.state.key
              }
          }).then(response=>{
              this.weeklyItems = response.data.results;
              this.setEmojiAndColor();

              let inputDate = this.weeklyItems[0].created;
              let date = moment(new Date()).format('YYYY-MM-DD');

              if(inputDate === date) {
                  this.todayItem = this.weeklyItems.splice(0, 1)[0];
                  this.changeDailyView();
              } else {
                  this.todayItem = null;
                  this.isUpdate = false;
                  this.component_selected = 'input-card';
              }

              // 주간을 7개까지만 보여주도록 splice로 자르는 부분
              if(this.weeklyItems.length > 7) {
                  console.log('짜르기 전 주간아이템', this.weeklyItems)
                  this.weeklyItems = this.weeklyItems.splice(0, 7);
                  console.log('짜른 후 주간아이템', this.weeklyItems)
              }
          }).catch(e=>{
              console.log('글 목록 가져오기 실패함')
          })
      },
      changeDailyView(){
            // 입력, 일간 교체 부분
            console.log('changeDailyView 실행됌');
            this.component_selected = this.component_selected === 'input-card' ? 'today' : 'input-card';
            this.isUpdate = true;
        }
    },
    created() {
      this.fetchDailyAndWeeklyEmojis();
      this.$eventBus.$on('changeComplete', this.fetchDailyAndWeeklyEmojis);
      // view 전환이 통신이 끝나기 전에 되니까 값 비우지 못함
      this.$eventBus.$on('changeDailyCard', this.changeDailyView);
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">

  *, *::before, *::after
    box-sizing: border-box

  body #member
    padding-top: 60px
    background: lightgray linear-gradient(to right, #e4afcb 0%, #b8cbb8 0%, #b8cbb8 0%, #e2c58b 30%, #c2ce9c 64%, #7edbdc 100%)

  .modal
    z-index: 10

  .login-card,
  .signup-card
    z-index: 100
</style>
