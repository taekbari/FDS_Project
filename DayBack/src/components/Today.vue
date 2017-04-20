<template>
  <div class="today">
    <div class="daily">
      <div class="daily-title">Today</div>
      <md-card class="dailyCard">
        <span class="dailyDate">{{todayItem.created}}</span>
        <div class="dailyContent">
          <md-card-media>
            <div :class="dailyEmotion">
              <img class="dailyEmoji" :src="emotion_src" alt="">
            </div>
          </md-card-media>
          <md-card-content>
            {{todayItem.content}}
          </md-card-content>
        </div>
        <div class="btn-group">
          <md-button @click.native="changeDaily">Change</md-button>
          <md-button @click.native="deleteDaily">Delete</md-button>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

  const DATE_FORMAT = 'YYYY년 M월 D일';

  export default {
    name: 'today',
    props: [
      'todayItem'
    ],
    data () {
      return {
        dailyEmotion: '',
        emotion_src: '',
        dailyItem: {
          created: '',
          author: '',
          mood: '',
          content: '이날은 기록한 코멘트가 없습니다.'
        },
        datalist: []
      }
    },
    methods: {
      renderEmoji() {
        let mood = this.todayItem.mood;
        if (mood == 4) {
          this.dailyEmotion = 'happy';
          this.emotion_src = require('../assets/img/happy.png');
        }
        else if (mood == 3) {
          this.dailyEmotion = 'sulky';
          this.emotion_src = require('../assets/img/sulky.png');
        }
        else if (mood == 2) {
          this.dailyEmotion = 'naughty';
          this.emotion_src = require('../assets/img/naughty.png');
        }
        else if (mood == 1) {
          this.dailyEmotion = 'hungry';
          this.emotion_src = require('../assets/img/hungry.png');
        }
        else
          return '이날 기분은 없습니다.'
      },
      changeDaily(){
        this.$emit('changeDailyCard')
      },
      deleteDaily(){
        // 수정과 비슷하지만 this.userInput(data)은 넣어주지 않음
        axios.delete('https://dayback.hcatpr.com/post/' + this.todayItem.id + '/', {
          headers: {
              'Authorization': 'Token ' + this.$store.state.key
          }
        })
        .then(response => {
          console.log(response);
          window.alert('삭제가 완료되었습니다!');
          this.$eventBus.$emit('changeComplete');
        })
        .catch(error => console.error(error.message)
        );
      }
    },
    created() {
      this.renderEmoji();
      console.log('todayItem', this.todayItem)
    }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .daily
    margin: 0 auto 60px
    width: 800px
    min-height: 400px
    position: relative

  .daily-title
    background: powderblue
    padding: 10px 30px
    position: absolute
    top: -10px
    left: 30px
    z-index: 10
    font-weight: 600
    font-size: 1.2em

  .dailyCard
    padding: 30px
    border-radius: 5px

  .dailyEmoji
    width: 150px

  .dailyDate
    font-weight: 500
    font-size: 1.2em
    text-align: left
    margin-top: 8px

  .dailyContent
    display: flex
    justify-content: center
    align-items: center
    flex-direction: row

  .md-card .md-card-media img
    width: 150px
    height: 150px

  .md-card-content
    width: 480px
    margin-left: 5%
    margin-bottom: 15px
    background: lighten(lightgray, 13%)
    border-radius: 5px

  .btn-group
    display: flex
    align-content: center
    justify-content: flex-end
    & md-button md-default-theme
      background: lightgray

</style>
