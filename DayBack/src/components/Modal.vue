<template>
  <div class="modal-template">
    <transition
      name="flipInY"
      enter-active-class="animated flipInY"
      leave-active-class="animated flipOutY"
      mode="out-in"
      :duration="{leave: 500}"
      appear
     >
      <div v-if="!show" class="wrapper signbox" key="signin-wrapper">
        <div class="container">
          <a
            @click="closeModal"
            class="close-button">x</a>
          <h2 class="title is-2">{{signin.title}}</h2>
          <!--input form으로 뺄 수 있는 부분-->
            <form method="post" class="form-signin">
              <fieldset>
                <input class="login" required type="text" name="email"
                v-model="signin.email"
                id="email" placeholder="이메일">
                <label for="login-id"></label>
                <input class="login" required type="password" name="password"
                v-model="signin.password"
                id="password" placeholder="비밀번호">
                <label for="login-id"></label>
                <input
                  @click="logIn" required
                  type="submit" value="로그인" class="submit-button">
                <label for="login button"></label>
                <a href="#"
                  @click="flipModal"
                  class="signup-button">{{signin.signup}}
                </a>
              </fieldset>
            </form>
            <div class="social">
              <p class="login-info">{{signin.loginInfo}}</p>
              <div class="social-buttons">
                <a href="#" class="social-google"
                @click=""
                ><span>G</span></a>
                <a href="#" class="social-facebook"
                @click=""
                ><span>f</span></a>
              </div>
            </div>
          </div>
        </div>
      <div v-else class="wrapper-signup signbox" key="signup-wrapper">
        <div class="container">
          <a
            @click="closeModal"
            class="close-button">x</a>
          <h2 class="title is-2">{{signup.title}}</h2>
          <form method="post" class="form-signin">
            <fieldset>
              <input class="login" required type="textarea" name="username"
                v-model="signup.nickname" maxlength="10"
                id="username" placeholder="닉네임">
              <label for="login-id"></label>
              <input class="login" required type="email" name="email"
                v-model="signup.email"
                id="email" placeholder="이메일">
              <label for="login-id"></label>
              <input class="login" required type="password" name="password"
               v-model="signup.password"
               id="password" placeholder="비밀번호">
              <label for="login-id"></label>
              <input class="login" required type="password" name="password"
               v-model="signup.passwordCheck"
               id="passwordCheck" placeholder="비밀번호 재확인">
              <label for="login-id"></label>
              <input
                @click="signUp"
                type="submit" value="가입하기" class="signup-button">
              <label for="signup button"></label>
            </fieldset>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      show: false,
      signin: {
        title: "로그인",
        signup: "회원가입",
        loginInfo: "또는 아래의 계정으로 로그인",
        email: '',
        password: '',
      },
      signup: {
          title: "회원가입",
          signup: "입력완료",
          loginInfo: "환영합니다",
          nickname: '',
          email: '',
          password: '',
          passwordCheck: ''
      }
    }
  },
  methods: {
    closeModal: function() {
      this.$emit('closeModal');
    },
    flipModal: function() {
      this.show = !this.show;
    },
    signUp: function(e) {
      // 입력 값이 모두 입력되었을 경우 기본 이벤트(submit) 막음
      if (this.signup.nickname !== '' && this.signup.email !== '' &&
          this.signup.password !== '' && this.signup.passwordCheck !== '') {
        e.preventDefault();
        // 입력한 비밀번호와 비밀번호 확인 값이 맞는지 체크
        if (this.signup.password !== this.signup.passwordCheck) {
          window.alert('비밀번호 틀렸습니다.');
          this.signup.password = '';
          this.signup.passwordCheck = '';
          return;
        }
      }
      else {
        return;
      }

      var _this = this;
      axios.post('https://dayback.hcatpr.com/signup/', {
        // 화면에서 넣는 data 형식 POST 하기
        email: this.signup.email,
        password: this.signup.password,
        nickname: this.signup.nickname
      })
      .then(response => {
        // 서버 통신 성공시
        window.alert('가입에 성공했습니다. 이제 로그인 해보세요! :-)');
        _this.signup.nickname = '';
        _this.signup.email = '';
        _this.signup.password = '';
        _this.signup.passwordCheck = '';
        // 가입하면 다시 로그인 페이지로 돌아가기
        _this.flipModal();
      })
      .catch(error => {
        if (error.response.data.email) {
          window.alert('이미 가입한 이메일입니다.');
        }
        else {
          window.alert('가입한 내용을 다시 한 번 확인해 주세요.');
        }
      })
    },
    logIn: function(e) {
      // 입력 값이 모두 입력되었을 경우 기본 이벤트(submit) 막음
      if (this.signin.email !== '' && this.signin.password !== '') {
        e.preventDefault();
      }
      else {
        return;
      }

      axios.post('https://dayback.hcatpr.com/login/', {
        email: this.signin.email,
        password: this.signin.password
      })
      .then(response => {
          var _this = response.data;
          console.log('_this', _this);
          console.log('_this.key', _this.key);
          console.log(response.status);
        // 사용자 정보를 가져온다
          axios.get('https://dayback.hcatpr.com/user/', {
            headers: {
              'Authorization': 'Token ' + _this.key
            },
            results: {
              nickname: this.nickname,
              email: this.email,
              password: this.password
            }
          })
          .then(response => {
            // 요청 후 처리
            // user 배열에 하나들어가기 때문에 0번으로 출력한다
            window.alert(response.data.results[0].nickname+ '님이 로그인 하셨습니다.');
            this.$store.state.key = _this.key;
            this.$router.push({path: './service'})
        })
      })
      .catch(error => {
        window.alert('이메일 주소나 비밀번호에 문제가 있어요!');
      })
    }
  }
}

</script>

<style lang="sass" rel="stylesheet/sass">
.modal-template
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(3f, 3f, 3f, 0.5)
  z-index: 200
  transition: opacity 1s ease

// _common-modules.sass
a, button
 text-decoration: none

%flex-col-center
  display: flex
  flex-flow: column
  justify-content: center
  align-items: center

%button-hover-scale
  cursor: pointer
  width: 300px
  transform: scale(1.12) 1s ease
  transition: all 0.3s ease-in-out

fieldset
  border: 0
  @extend %flex-col-center

// local styling
.wrapper, .wrapper-signup
  margin: 5rem auto
  display: flex
  @extend %flex-col-center
  &-signup
    position: relative
    top: 0

.container
  position: relative
  width: 400px
  height: 500px
  background-color: #fff
  border: 1px solid #a322ef
  border-radius: 3px
  z-index: 210
  @extend %flex-col-center

.close-button
  position: absolute
  top: -10px
  right: -30px
  font-size: 30px
  color: #fff
  cursor: pointer

.title
  margin-bottom: 30px
  color: #a322ef
  font-weight: 400

.form-signin
  line-height: 30px
  font-size: 17px
  width: 260px
  @extend %flex-col-center
  .login
    border: 0
    border-bottom: 5px solid #dcdcdc
    padding: 5px 0
    margin: 0 auto 2px auto
    font-size: 25px
    text-indent: 10px
  .submit-button, .signup-button
    width: 260px
    border: 1px solid #C5C1FF
    border-radius: 20px
    height: 40px
    line-height: 40px
    font-size: 17px
    text-align: center
    background: #fff
    box-sizing: border-box
    margin: 10px auto 15px auto
  .submit-button
   color: #b145f0
   margin-top: 30px
   &:hover
    @extend %button-hover-scale
  .signup-button
    border: none
    background-image: linear-gradient(65deg, #FFBAC3 0%, #C5C1FF 56%, #2CD8D5 100%)
    color: #fff
    margin-bottom: 30px
    &:hover
     @extend %button-hover-scale

.social
  display: flex
  flex-flow: column
  justify-content: center
  width: 300px
  .login-info
    color: #505050
    font-size: 12px
    letter-spacing: -1px
    display: block
    text-align: center
    position: relative
    font-size: 0.9rem
    &::before,
    &::after
      content: ''
      position: absolute
      top: 50%
      height: 1px
      background: #a0a0a0
      width: 20%
    &::before
      left: 10px
    &::after
      right: 10px

  .social-buttons
    width: 300px
    height: 50px
    display: flex
    flex-flow: row
    justify-content: space-around
    margin-top: 10px
    .social-google, .social-facebook
      align-items: center
      position: relative
      width: 50px
      height: 50px
      border-radius: 50%
    .social-google
      background-color: rgb(82.3%, 32.1%, 32.1%)
      margin-left: 60px
      span
        position: absolute
        font-family: Avenir
        top: 17px
        left: 13px
        font-size: 30px
        color: #fff
        font-weight: 600
    .social-facebook
      background-color: rgb(19.5%, 49.2%, 92.1%)
      margin-right: 60px
      span
        position: absolute
        font-family: Avenir
        top: 18px
        left: 19px
        font-size: 30px
        color: #fff
        font-weight: 600
</style>
