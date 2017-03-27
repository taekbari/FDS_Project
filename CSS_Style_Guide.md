# CSS / Sass Style Guide  

Airbnb CSS / Sass Style Guide를 기본으로 필요한 내용을 추가 & 제거 하였습니다.  

## 목차  

1. [CSS](#css)  
   * [형식](#형식)  
   * [주석](#주석)  
   * [OOCSS](#oocss)  
   * [자바스크립트 훅](#자바스크립트-훅)  
   * [Border](#border)  
2. [Sass](#sass)  
   * [문법](#문법)  
   * [순서](#순서)  
   * [변수](#변수)  

## CSS  

### 형식  

* 들여쓰기는 soft tabs (띄어쓰기 2칸)을 사용하세요.  
* 클래스 이름은 camelCasing 방식보다 `-`를 사용하세요.  
  * 만약 BEM을 사용하고 있다면 `_`와 PalcalCase 방식을 사용하셔도 괜찮습니다.  
* ID 선택자를 사용하지 마세요.  
* 규칙 선언부에서 다중 선택자를 사용하실 때, 선택자를 한 줄에 한 개씩 적어주세요.  
* 규칙 선언부의 여는 괄호 `{` 이전에 띄어쓰기를 넣어주세요.  
* 속성 부분에서, `:` 문자 뒤에 띄어쓰기를 넣어주세요. 단, `:` 문자 앞에는 띄어쓰기를 넣지 말아주세요.  
* 규칙 선언부의 닫는 괄호 `}`를 새로운 줄에 넣어주세요.  
* 규칙 선언부들 사이에 빈 줄을 넣어주세요.  

##### 잘못된 예시  

```css  
.avatar{
  border-radius: 50%;
  border: 2px solid white; }
.no, .nope, .not_good {
  // ...
}
#lol-no {
  // ...
}
```  

##### 올바른 예시  

```css  
.avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
  // ...
}
```  

### 주석  

* 블록주석보다 라인주석(Sass일 경우 `//`)을 권장합니다.  
* 주석을 새로운 줄에 적어주세요. 선택자 또는 속성과 같은 줄에 주석을 작성하는 방식을 피해주세요.  
* 코드 자체만으로 이해하기 어려운 경우 자세한 주석을 작성해주세요.  
 * z-index를 사용하는 경우  
 * 특정 브라우저를 지원하기 위해 사용하는 경우  

### OOCSS  

**OOCSS**, 또는 “Object Oriented CSS”는 당신의 스타일시트를 "객체"의 모음(한 웹사이트에서 독립적으로 사용되는, 재사용 가능하고 반복 가능한 단편들)으로 생각하게 만드는 CSS 작성 방식입니다.  

 ```css  
 .globalwidth {
  width: 980px;
  margin: 0 auto;
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  overflow: hidden;
}

.header-inside {
  padding-top: 20px;
  padding-bottom: 20px;
  height: 260px;
}
 ```  

 ```html  
<header>
  <div class="header-inside globalwidth">
  </div>
</header>

<div class="main globalwidth">
</div>

<footer>
  <div class="footer-inside globalwidth">
  </div>
</footer>
 ```  

### 자바스크립트 훅  

CSS 클래스 명에 자바스크립트 훅을 거는 것을 권장하지 않습니다. 한 클래스 명에 두 가지를 혼합시키게 되면 결국 리팩토링할 때 두 경우를 모두 고려해야하기 때문에 시간이 낭비되며, 최악의 경우에는 기능이 작동하지 않을 가능성 때문에 개발자가 코드를 변경시키길 두려워할 수도 있습니다.  

자바스크립트에 바인드 할 새로운 클래스 (접두어로 `.js-`를 추가)를 만드는 것을 권장합니다.  

```html  
<button class="btn btn-primary js-request-to-book">Request to Book</button>
```

### Border  

border가 없을 경우에는 `none` 대신 `0`을 사용하세요.  

##### 잘못된 예시  

```css  
.foo {
  border: none;
}
```  

##### 올바른 예시  

```css  
.foo {
  border: 0;
}
```  

---

## Sass  

### 문법  

* 변수 선언 부분만 `scss`, 나머지 영역은 `sass` 사용해주세요.  
* 일반적인 CSS와 `@include` 선언은 논리적으로 순서를 정리해주세요.
  * 일반적인 CSS 부분을 앞쪽에, `@include` 선언은 뒷 부분에 정리해주세요.  

### 속성 선언 순서  

1. 속성 선언  

우선 표준 속성 선언을 먼저 작성합니다. `@include` 혹은 중첩 선택자는 아직 적지 않습니다.  

```scss  
.btn-green {
  background: green;
  font-weight: bold;
  // ...
}
```  

표준 속성 선언 순서는 다음과 같습니다.  

> 레이아웃 설정(`display`, `position`, `flex`)  
>
> 박스 모양 설정  
>> `width`, `height`  
>> `background`  
>> `padding`  
>> `border`  
>> `margin`  
>
> 표현 설정  
>> `font`  
>> `transition`, `transform`  

2. `@inclue` 선언  

`@include`를 마지막에 모아놓으면 전체 선택자를 쉽게 독해할 수 있습니다.  

```scss  
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);
  // ...
}
```  

3. 중첩 선택자  

중첩 선택자는 마지막에 위치합니다. 그리고 그 다음으로는 아무것도 적지 않습니다. 규칙 선언부와 중첩 선택자 사이에는 여백을 추가하며, 중첩 선택자 사이에도 마찬가치입니다. 중첩 선택자 내부 속성들 또한 위의 규칙을 따릅니다.  

```scss  
.btn-green {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);

  .icon {
    margin-right: 10px;
  }
}
```  

### 변수  

변수 이름을 정할 때는 `-`를 사용하는 것을 권장합니다.  

### 중첩 선택자  

중첩은 최대 3번까지!  

```scss  
.page-container {
  .content {
    .profile {
      // STOP!
    }
  }
}
```  

---  

### 참고 사이트  

* [Airbnb CSS / Sass 스타일 가이드](#https://github.com/CodeMakeBros/css-style-guide)  
* [An Introduction To Object Oriented CSS (OOCSS)](#https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/)
