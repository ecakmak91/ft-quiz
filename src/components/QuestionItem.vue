<template>

  <Transition name="fade">
  <div class="question">
    <h3>Question {{ index+1 }} of {{ totalLength }} </h3>
    <div class="question-text">{{question.question}}</div>
    <div class="options">
      <a v-for="(option, i) in question.options" :key="i" @click="clickOpt(index,i)" :class="question.userAnswer===i ? 'selectedOpt':''">
        {{ option }}
        <span v-if="isQuizFinish && question.correctAnswer===i"></span>
      </a>
    </div>
  </div>
</Transition>
</template>
<script setup>
  import { ref,watch } from "vue";
  import useQuestionJobs from "../composables/questionJobs.js"
  const props=defineProps({
    question:Object,
    index:Number,
    totalLength:Number,
    isQuizFinish:Boolean
  })
  const emit = defineEmits(['nextPage'])

  const {setAnswer} = useQuestionJobs()
  const selectedOpt=ref(null)


  watch(props, () => {
    selectedOpt.value=null
  });

  const clickOpt = (index,userOption)=>{
    
    if(!props.isQuizFinish){
      selectedOpt.value=userOption
      setAnswer(index,userOption)
      emit("nextPage",index+1);
    }
    
  }


</script>
<style lang="scss" scoped>
@import '../assets/base.scss';
.question{
  list-style: none;
  position: relative;
  border-radius: 1em;
  background: #fff;
  overflow: hidden;
  box-shadow: 0px 0px 18px -5px #ccc;
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &.active{
    z-index: 2;
    top:0;
  }
  h3{
    background: $ft-pink;
    color: #fff;
    width: 300px;
    text-align: center;
    height: 50px;
    border-radius: 0 0 30px 30px;
    position: absolute;
    top: 0;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .question-text{
    background-color: $ft-orange;
    color: #fff;
    width: 100%;
    text-align: center;
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    box-sizing: border-box;
  }
  .options{
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    padding: 2em;
    box-sizing: border-box;
    a{
      width: 33%;
      padding: 1em 0em;
      box-sizing: border-box;
      box-shadow: 0 0 5px 0px #ccc;
      margin: 1em;
      border-radius: 2em;
      transition: .3s;
      text-align: center;
      cursor: pointer;
      position: relative;
      &:hover{
        color: #fff;
        background: $ft-blue;
      }
      &.selectedOpt{
        background: $ft-purple;
        color: #fff;
      }
      span{
        border: 5px solid #24c200;
        width: 100%;
        display: block;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
        border-radius: 3em;
        box-sizing: border-box;
      }
    }
  }
}


@media only screen and (max-width: 1200px) {
  .question {
    .question-text {
      padding: 0 2em;
    }
    .options{
      padding: 2em 0;
      a{
        width: 40%;
      }
    }
  }
}

@media only screen and (max-width: 650px) {
  .question {
    justify-content: space-between;
    .question-text{
      height: 35%;
      padding-top: 2em;
    }
    .options {
      height: 65%;
      padding: 0;
      flex-wrap: nowrap;
      flex-direction: column;
      a{
        width: 80%;
        margin: .5em 0;
        padding: 1em 0.5em;
      
      }
    }
  }
}
@media only screen and (max-width: 480px) {
  .question-list{
      padding-top: 0em;
      .question {
        height: 70vh;
      }
  }
  
}






</style>
