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
  import axios from 'axios'

  export default {
    name: 'main',
    data () {
      return {
        // * 데이터 영역
        // 객체 형태로 일간 데이터를 한꺼번에 넣기
        // 기본값 null로 하면 안됨
        todayItem: {},
        // todayItem: null,
        // 주간 글 목록 저장을 위한 배열
        weeklyItems : [],
        // 입력, 일간 화면전환을 위한 변수
        component_selected: 'input-card',
        // 사용자의 아이디
        authorID: 0,
        // 수정시 필요한 부분
        isUpdate : false,
      }
    },
    components: {
      InputCard,
      Today,
      Week
    },
    created() {
      this.fetchDailyAndWeeklyEmojis();
      this.$eventBus.$on('changeComplete', this.fetchDailyAndWeeklyEmojis);
    },
    methods: {
      fetchDailyAndWeeklyEmojis() {
        // * axios 통신 (this 컨텍스트가 바뀜 - this를 let 변수로 선언하거나 ES6의 arrow fn을 사용한다.)
        // 1. 사용자 정보(GET 형식) - 서버에 비동기 통신 호출
        axios.get('https://dayback.hcatpr.com/user/', {
          headers : {
            'Authorization': 'Token ' + this.$store.state.key
          }
        }).then(response => {
        // 통신 성공시 처리
          // 서버에서 받아온 사용자 정보의 id 값을 authorID에 할당
          // 해당 컴포넌트에서 설정한 데이터 형식 = 통신 시 받아오는 데이터 response.data.(api 데이터 형식에 맞게)
          this.authorID = response.data.results[0].id;
          console.log('author ID: ', this.authorID);
        })
        .catch(error => {
          console.error(error);
          window.alert('사용자 정보를 가져오는 데 실패했습니다.')
        });
        // 2. 글 목록 정보
        axios.get('https://dayback.hcatpr.com/post/', {
          headers : {
            'Authorization': 'Token ' + this.$store.state.key
          }
        }).then(response => {
          this.weeklyItems = response.data.results;
          this.setEmojiSrcAndColor();
          // 데이터 보낼 때 오늘인지 확인하기
          let inputDate = this.weeklyItems[0].created;
          let date = moment(new Date()).format('YYYY-MM-DD');
          console.log('date', date);
          // today 불러오기
          if (inputDate === date) {
            console.log('오늘의 날짜')
            this.todayItem = this.weeklyItems.splice(0, 1)[0];
            // 값이 있는 경우 호출할 함수(조회창으로 이동)
            this.changeDailyView();
          } else {
            // today가 없을 때 처리(삭제 시)
            this.todayItem = null;
            this.component_selected = 'input-card';
            // 아래 속성을 바꿔주지 않으면 changeDailyView(화면 전환)에서 
            // this.isUpdate 값이 true로 머물러 있어서 id가 없다고 함 -> InputCard.vue에서
            // put을 타기 때문에 문제 생김 - Post로 바꿔줘야 함
            this.isUpdate = false;
          }
          // weekly 7개씩 불러오기 -> today를 먼저 확인하고 7개씩 자르기 위해서
          if ( this.weeklyItems.length >= 7 ) {
              this.weeklyItems = this.weeklyItems.splice(0, 7);
          }
          console.log('this.weeklyItems : ', this.weeklyItems);
          console.log('this.todayItem : ', this.todayItem);
        }).catch(error => {
          console.error(error);
          window.alert('글목록을 가져오는 데 실패했습니다.')
        })
      },
      changeDailyView(){
        // 입력창과 일간 화면 전환 - 값이 들어가 있는 경우 바로 daily 조회 창으로 돌아감
        console.log('changeDailyView 실행됌');
        this.component_selected = this.component_selected 
        === 'input-card' ? 'today' : 'input-card';
        // 삭제 시에는 아래 값을 false로 바꿔줘야함 - 위의 90번째 줄
        this.isUpdate = true;
      },
      setEmojiSrcAndColor() {
        let index, length;
        length = this.weeklyItems.length;

        for(index = 0; index < length; index++) {
          let emoji = this.weeklyItems[index].mood;
          // let color = '';
          // 각각의 아이템에 동적으로 속성추가
          switch(emoji){
            case 1: 
              this.weeklyItems[index].emojiSrc = require('../assets/img/hungry.png');
              this.weeklyItems[index].matchingColor = 'hungry';
              // color = 'hungry';
              break;
            
            case 2: 
              this.weeklyItems[index].emojiSrc = require('../assets/img/naughty.png');
              this.weeklyItems[index].matchingColor = 'naughty';
              break;
            
            case 3: 
              this.weeklyItems[index].emojiSrc = require('../assets/img/sulky.png');
              this.weeklyItems[index].matchingColor = 'sulky';
              break;
            
            case 4: 
              this.weeklyItems[index].emojiSrc = require('../assets/img/happy.png');
              this.weeklyItems[index].matchingColor = 'happy';
              break;
          }
          // 동적으로 속성 추가
          // this.weeklyItems[index].matchingColor = color;
        }
          console.log('setEmojiSrcAndColor') 
      }
    },
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">

body #member 
  padding-top: 60px
  background: linear-gradient(65deg, #FFBAC3 0%, #C5C1FF 56%, #2CD8D5 100%)
*, *::before, *::after
    box-sizing: border-box
.flex-wrapper
  padding-bottom: 60p
</style>
