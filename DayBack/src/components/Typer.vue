<template>
<div class="typer">
    <div class="type-container">
        <span id="teletype" v-text="typeIt">"{{ message }}"</span>
    </div>
    <form class="hideaway" >
        <input type="text" id="typer" value="당신의 하루 기분은 어땠나요? :)">
        <input class="typer-btn" type="submit" value="입력">
    </form>
    </div>
</template>

<script>
    export default {
    mounted() {
        const formEntry = document.getElementsByTagName("form")[0],
        cursor = "<span>|</span>"
    },
    data: {
        message: ""
    },
    watch: {
        message: function (getMessage) {
            this.typeIt();
        }
    },
    computed: {
        typeIt: function(){
        //     this.formEntry.addEventListener("submit", function(e) {
        //     e.preventDefault();
        //     typeIt();
        //     console.log('typer add Event');
        // });
            let counter = 0,
                typedLen = typer.value.length;
                teletype.innerHTML = cursor;
            // HTML의 hidden 속성을 제거하면서 보여짐
            teletype.removeAttribute("hidden");
            // 시간을 설정해주는 함수 추가
            var i = setInterval(function() {
                // 보여지는 부분에 input에 적은 내용을 글자를 쪼개서 보여줌
                // substr(start, length)함수 사용
                teletype.innerHTML = typer.value.substr(0, counter) + cursor;
                counter++;
                if (counter === typedLen + 1) {
                    formEntry.classList.toggle("hideaway");
                    clearInterval(i);
                }
            }, 100)
        }
        }
}


    
</script>
<style>
@keyframes blink {
    from,
    to {
        color: transparent;
    }
    50% {
        color: #C5C1FF;
    }
}

* {
    box-sizing: border-box;
}

body {
    margin: 0;
}

.type-container {
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #C5C1FF;
}

#teletype {
    font-family: Avenir;
    text-align: center;
    font-size: 2rem;
    display: block;
    width: 33rem;
}

#teletype span {
    animation: blink 1s step-end infinite;
}

form {
    background: transparent;
    padding: 1rem;
    text-align: center;
    color: #eee;
    transition: 1s;
}

#typer {
    padding: .4rem;
    font-size: inherit;
    width: 36rem;
    font-size: 1rem;
    outline: none;
}

input[type="submit"] {
    font-size: inherit;
    display: inline-block;
    padding: 0.6rem 1.2rem;
    border: 0;
    background-image: linear-gradient(65deg, #FFBAC3 0%, #C5C1FF 56%, #2CD8D5 90%);
    box-shadow: 1px -1px 4px lightblue;
    cursor: pointer;
    color: #fff;
    border-radius: 3px;
    outline: none;
}

input[type="submit"]:active {
    position: relative;
    top: -1px;
}

.hideaway {
    transform: translateY(10vw);
}
</style>