<template>
  <div class="about">
    <div class="question-list">
      <Transition name="fade">
        <QuestionItem  
          v-show="activePage"
          :question="questionList[selectedPages]" 
          :index="selectedPages" 
          :totalLength="questionList.length"
          :isQuizFinish="isQuizFinish"
          @nextPage="nextPage"
        ></QuestionItem>
      </Transition>
    </div>
  </div>
  <div class="optical-form" :class="{active:openOpticalForm}">
    <a @click="finishQuizButton" v-if="isFinishButtonOpen" class="finish-quiz animate__animated animate__bounce">Finish</a>
    <div class="item" v-for="(item, index) in questionList" :key="index">
      <span class="question-number" @click="changePage(index)"> {{index+1}} </span>
      <div class="options">
        <a v-for="(option, i) in item.options" :key="i" :class="item.userAnswer==i ? 'selected':''">
          <span v-if="isQuizFinish && item.correctAnswer===i"></span>
        </a>
      </div>
    </div>
  </div>
  <a @click="toggleOpticalForm" class="burger-optical-form" :class="{active:openOpticalForm}">
    <span></span>
    <span></span>
    <span></span>
  </a>

  <div class="popup" v-if="isPopupOpen">
    <div class="overlay">
      <div class="title">{{quizResult.title}}</div>
      <div class="message">{{quizResult.description}}</div>
      <div class="score">
        <p>Your score</p>
        <span>{{quizResult.score}}</span>
      </div>
      <div class="buttons">
        <a @click="resetQuizButton" class="close-popup">Restart</a>
        <a @click="closeButton" class="close-popup">Close</a>
      </div>
    </div>
  </div>
  <kinesis-container class="bg-parallax">
    <kinesis-element class="bg-image bg-image1" :strength="2">
      <img src="../assets/bg/1.png" alt="bg part 1"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image2" :strength="4">
      <img src="../assets/bg/2.png" alt="bg part 2"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image3" :strength="6">
      <img src="../assets/bg/3.png" alt="bg part 3"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image4" :strength="8">
      <img src="../assets/bg/4.png" alt="bg part 4"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image5" :strength="10">
      <img src="../assets/bg/5.png" alt="bg part 5"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image6" :strength="3">
      <img src="../assets/bg/6.png" alt="bg part 6"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image7" :strength="5">
      <img src="../assets/bg/7.png" alt="bg part 7"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image8" :strength="7">
      <img src="../assets/bg/8.png" alt="bg part 8"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image9" :strength="9">
      <img src="../assets/bg/9.png" alt="bg part 9"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image10" :strength="11">
      <img src="../assets/bg/10.png" alt="bg part 10"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image11" :strength="13">
      <img src="../assets/bg/11.png" alt="bg part 11"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image12" :strength="15">
      <img src="../assets/bg/12.png" alt="bg part 12"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image15" :strength="17">
      <img src="../assets/bg/15.png" alt="bg part 15"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image16" :strength="19">
      <img src="../assets/bg/16.png" alt="bg part 16"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image17" :strength="22">
      <img src="../assets/bg/17.png" alt="bg part 17"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image18" :strength="24">
      <img src="../assets/bg/18.png" alt="bg part 18"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image19" :strength="12">
      <img src="../assets/bg/19.png" alt="bg part 19"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image20" :strength="13" axis="x">
      <img src="../assets/bg/20.png" alt="bg part 20"/>
    </kinesis-element>
    <kinesis-element class="bg-image bg-image21" :strength="20" axis="x">
      <img src="../assets/bg/21.png" alt="bg part 21"/>
    </kinesis-element>
  </kinesis-container>


</template>
<script setup>
  
  import 'animate.css';
  import { ref } from "vue";
  import QuestionItem from "../components/QuestionItem.vue"
  import useQuestionJobs from "../composables/questionJobs.js"

  import { KinesisContainer, KinesisElement} from "vue-kinesis"

  const {questionList, finishQuiz, resetQuiz} = useQuestionJobs()
  const selectedPages = ref(0)

  const activePage = ref(true)
  const isFinishButtonOpen = ref(false)

  const isQuizFinish=ref(false)
  const isPopupOpen=ref(false)
  const openOpticalForm=ref(false)

  const quizResult=ref({
    title:"",
    description:"",
    score:null
  })

  const nextPage=(index)=>{
    
    if(index<questionList.length){
      activePage.value=false
      selectedPages.value=index

      setTimeout(()=>{
        activePage.value=true
      },500)
    }else{
      isFinishButtonOpen.value=true
    }
    
    

  }
  
  
  const finishQuizButton=()=>{
    finishQuiz()
      .then(e=>{
        quizResult.value=e
        isQuizFinish.value=true
        isPopupOpen.value=true
      })
  }

  const resetQuizButton=()=>{
    
    if(resetQuiz()){
      isQuizFinish.value=false
      isPopupOpen.value=false
      selectedPages.value=0
      quizResult.value={
        title:"",
        description:"",
        score:null
      }
    }
    
  }

  const closeButton=()=>{
    isPopupOpen.value=false;
  }

  const toggleOpticalForm=()=>{
    openOpticalForm.value=!openOpticalForm.value
  }
  const changePage=(index)=>{
    selectedPages.value=index
    openOpticalForm.value=false
  }

  
  //const deneme=question.deneme.value

</script>
<style lang="scss" scoped>
  @import '../assets/base.scss';
  .question-list{
    position: relative;
    padding-top: 3em;
    border-radius: 1em;
  }
  .optical-form{
    position: fixed;
    width: 50vw;
    bottom: 0;
    display: flex;
    left: 50%;
    justify-content: center;
    margin-left: -25vw;
    background: #fff;
    z-index: 2;
    .finish-quiz{
      position: absolute;
      top: -40px;
      width: 100px;
      height: 40px;
      margin-left: -50px;
      text-align: center;
      background: #e96092;
      color: #fff;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      left: 50%;
      border-radius: 1em 1em 0 0px;
      transition: .3s;
      overflow: hidden;
      cursor: pointer;
    }
    .item{

      border: 1px solid $ft-orange;
      .question-number{
        border-bottom: 1px solid #ccc;
        background-color: $ft-orange;
        padding: 0.5em;
        width: 1em;
        display: block;
        text-align: center;
        cursor: pointer;
      }
      .options{
        text-align: center;
        a{
          background-color: $ft-yellow;
          width: 1.5em;
          height: 1.2em;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: .5em auto;
          position: relative;
          transition: .5s;
          &.selected{
            background-color: $ft-purple;
          }
          span{
            border: 2px solid #24c200;
            width: 100%;
            display: block;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 0;
            box-sizing: border-box;
          }
        }
      }
    }
    
  }
  .popup {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;
    display: flex;
    z-index: 9;
    .overlay{
      width: 80%;
      max-width: 500px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 1em;
      flex-direction: column;
      overflow: hidden;
      .title{
        background-color: $ft-pink;
        width: 100%;
        text-align: center;
        color: #fff;
        padding: 1em;
        box-sizing: border-box;
        font-size: 1.5em;
      }
      .message{
        margin: 2em 0 0;
      }
      .score{
        text-align: center;
        margin-bottom: 3em;
        p{
          font-size: 1em;
          font-weight: 700;
        }
        span{
          font-size: 2em;
          background: #fff;
          display: block;
          box-shadow: 0px 0px 5px 1px #ccc;
          border-radius: 0.5em;
          padding: 0.4em 0;
        }
      }
      .buttons {
        display: flex;
        margin-bottom: 1em;
        .close-popup{
          cursor: pointer;
          background-color: $ft-purple;
          color: #fff;
          padding: 0.5em 1em;
          margin: 0 1em;
          border-radius: 1em;
          border:1px solid $ft-purple;
          transition: .3s;
          &:hover{
            color: $ft-purple;
            background-color: #fff;
          }
        }
      }
      
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: .2s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    transform: translateY(180px);
  }
  .bg-parallax{
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 0;
    .bg-image{
      position: fixed;
      
      &.bg-image1{
        top: 0;
        left: 30%;
        width: 120px;
      }
      &.bg-image2{
        top: 0;
        left: 10%;
        width: 120px;
      }
      &.bg-image3{
        bottom: 0;
        left: 0;
        width: 100px;
      }
      &.bg-image4{
        top: 100px;
        right: 0;
        width: 120px;
      }
      &.bg-image5{
        bottom: 0;
        left: 20%;
        width: 40px;
      }
      &.bg-image6{
        bottom: 20%;
        right: 10%;
        width: 30px;
      }
      &.bg-image7{
        top: 1%;
        right: 20%;
        width: 120px;
      }
      &.bg-image8{
        top: 24%;
        left: 1%;
        width: 30px;
      }
      &.bg-image9{
        top: 15%;
        left: 0%;
        width: 50px;
      }
      &.bg-image10{
        top: 10%;
        right: 10%;
        width: 40px;
      }
      &.bg-image11{
        top: 60%;
        right: 10%;
        width: 80px;
      }
      &.bg-image12{
        top: 50%;
        left: 0%;
        width: 60px;
      }
      &.bg-image15{
        bottom: 0;
        right: 0%;
        width: 120px;
      }
      &.bg-image16{
        top: 0;
        right: 0%;
        width: 150px;
      }
      &.bg-image17{
        bottom: 5%;
        right: 15%;
        width: 200px;
      }
      &.bg-image18{
        bottom: 30%;
        right: 5%;
        width: 30px;
      }
      &.bg-image19{
        top: 7%;
        left: 10%;
        width: 40px;
      }
      &.bg-image20{
        bottom: 30%;
        left: 5%;
        width: 40px;
      }
      &.bg-image21{
        top: 5%;
        left: 5%;
        width: 30px;
      }
      img{
        width: 100%;
      }
    }
  }
  .about {
    position: relative;
    z-index: 9;
  }
  .burger-optical-form{
    /*display: none;*/
    position: fixed;
    z-index: 99999;
    width: 40px;
    height: 40px;
    right: 1em;
    bottom: 1em;
    span{
      background-color: $ft-orange;
      display: block;
      width: 80%;
      height: 5px;
      transition: .3s;
      &:nth-child(2){
        margin: .5em 0;
      }
    }
    &.active{
      span{
        &:nth-child(1){
          transform: rotate(45deg);
          margin: 15px 0 -26px 0;
        }
        &:nth-child(2){
          opacity: 0;
        }
        &:nth-child(3){
          transform: rotate(-45deg);
        }
      }
    }
  }

  @media only screen and (max-width: 650px) {
    .question-list[data-v-85b27e8c] {
      padding-top: 0em;
    }
    .optical-form {
      width: 100vw;
      left: 0;
      margin-left: 0;
      background: #fff;
      z-index: 999;
      height: 100%;
      flex-direction: column;
      transition: .3s;
      top: 100%;
      &.active{
        top: 0;
      }
      .item{
        display: flex;
        justify-content: center;
        border: none;
        margin-bottom: 1em;
        .options{
          display: flex;
          align-items: center;
          background-color: #f5f5f5;
          a{
            margin: 0 1em;
          }
        }
      }
    }
  }
</style>
