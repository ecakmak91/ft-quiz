//import { ref,computed } from 'vue'
//import { useStore } from 'pinia'

import { useQuestionStore } from '../stores/question'


export default function useQuestionJobs() {
  // Filtrelenmiş ürün listesi
  const {questionList, scores, calculateScore, setAnswer, resetQuiz, addQuestion } = useQuestionStore()
  const finishQuiz=()=>{
    return new Promise((resolve, reject) => {
      // Simulate an async operation
      const result=calculateScore()
      if (typeof result=="number") {
        let sortedScores=scores.sort((a,b)=>a-b)
        
        const targetPosition=sortedScores.findIndex(item => item > Math.ceil(result))
        const succesRate=(targetPosition/(scores.length+1))*100
        
        let resultObj={
          score:Math.ceil(result),
          title:"",
          description:"You were better then "+Math.ceil(succesRate)+"% of all quizers"  
        }

        if(targetPosition>(scores.length/2)){
          resultObj.title="Congratulations!"
        }else{
          resultObj.title="Try again!" 
        }


        resolve(resultObj)
      } else {
        reject('An error occured')
      }
    })
  }
  const pushQuestion=(obj)=>{
    addQuestion(obj)
  }
  

  return {
    questionList,
    finishQuiz,
    setAnswer,
    resetQuiz,
    pushQuestion,
  }
}
