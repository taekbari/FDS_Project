<template>
  <div class="today">
    <div class="daily">
      <div class="daily-title">Today</div>
      <md-card class="dailyCard">
        <span class="dailyDate">{{todayItem.created}}</span>
        <div class="dailyContent">
          <md-card-media>
            <div :class="dailyEmotion">
              <img class="dailyEmoji" :src="this.emotion_src" alt="">
            </div>
          </md-card-media>
          <md-card-content>
            {{dailyItem.comment}}
          </md-card-content>
        </div>
        <div class="btn-group">
          <md-button @click.native="changeDaily(dailyItem.id)">Change</md-button>
          <md-button @click.native="deleteDaily">Delete</md-button>
        </div>
      </md-card>
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import axios from 'axios';

  export default {
      name: 'today',
      props: ['todayItem'],
      data () {
          return {
              dailyEmotion: '',
              emotion_src: '',
              dailyItem: {
                  mood: '기록한 기분이 없습니다',
                  content: '작성한 코멘트가 없습니다.'
              },
              datalist: []
          }
      },
      methods: {
          renderEmoji() {
              let emoji = this.dailyItem.emoji;
              if (emoji == 4) {
                  this.dailyEmotion = 'happy';
                  this.emotion_src = require('../assets/img/happy.png');
              }
              else if (emoji == 3) {
                  this.dailyEmotion = 'sulky';
                  this.emotion_src = require('../assets/img/sulky.png');
              }
              else if (emoji == 2) {
                  this.dailyEmotion = 'naughty';
                  this.emotion_src = require('../assets/img/naughty.png');
              }
              else if (emoji == 1) {
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
              axios.delete('https://dayback.hcatpr.com/post/' + this.todayItem.id + '/', {
                  headers: {
                      'Authorization': 'Token ' + this.$store.state.key
                  }
              }).then(response => {
                  console.log(response);
                  console.log('this.todayItem.id', this.todayItem.id);
                  window.alert('삭제되었습니다');

                  // 삭제했을 때 다시 돌리는 부분 (통신이 끝나기 전에 컴포넌트를 돌리면 통신을 하면서 값을 비우는 걸 다 못 하니까 하면 안됌)
//                  this.$eventBus.$emit('changeDailyCard');
                  // 수정, 삭제 마무리하고 다시 뿌려줄 때
                  this.$eventBus.$emit('changeComplete');
              }).catch(e => {
                  console.error('삭제에 실패했습니다');
              })
          }
      },
      created () {
          this.dailyItem.emoji = this.todayItem.mood;
          this.dailyItem.comment = this.todayItem.content;
          console.log('emoji', this.dailyItem.emoji);
          console.log('commnet', this.dailyItem.comment);
          this.renderEmoji();
      }
  }
</script>

<style lang="sass" scoped rel="stylesheet/sass">
  .daily
    margin: 0 auto 60px
    position: relative
    width: 800px
    min-height: 450px

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
