import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', () => {
  const questionList = ref([
    {
      question: "How many chucks could a woodchuck chuck if a woodchuck could chuck wood?",
      options: ["5", "50", "500", "They don't chuck wood!"],
      correctAnswer: 3,
      userAnswer:null
    },
    {
      question: "What do you call a fake noodle?",
      options: ["An im-pasta", "A no-noodle", "A spaghetti squash", "A zucchini fettuccine"],
      correctAnswer: 0,
      userAnswer:null
    },
    {
      question: "What's the difference between a poorly dressed man on a trampoline and a well-dressed man on a trampoline?",
      options: ["Their clothes", "Their height", "Their weight", "Nothing, they both look silly"],
      correctAnswer: 3,
      userAnswer:null
    },
    {
      question: "What do you get when you cross a snowman and a shark?",
      options: ["Frostbite", "A snow shark", "Jaws on ice", "A frozen fish"],
      correctAnswer: 2,
      userAnswer:null
    },
    {
      question: "Why did the tomato turn red?",
      options: ["Because it was ripe", "Because it was embarrassed", "Because it saw the ketchup", "Because it was blushing"],
      correctAnswer: 0,
      userAnswer:null
    },
    {
      question: "What do you call a bear with no teeth?",
      options: ["A toothless bear", "A gummy bear", "A grizzly cub", "A honey thief"],
      correctAnswer: 1,
      userAnswer:null
    },
    {
      question: "Why did the chicken cross the playground?",
      options: ["To play with the kids", "To get to the swing set", "To get to the other slide", "To see the teacher"],
      correctAnswer: 2,
      userAnswer:null
    },
    {
      question: "What do you call a boomerang that doesn't come back?",
      options: ["A stick", "A frisbee", "A broken boomerang", "A disappointment"],
      correctAnswer: 0,
      userAnswer:null
    },
    {
      question: "Why don't scientists trust atoms?",
      options: ["Because they're too small", "Because they're always changing", "Because they're unstable", "Because they make up everything"],
      correctAnswer: 3,
      userAnswer:null
    },
    {
      question: "What do you call a group of cows playing instruments?",
      options: ["A cow symphony", "A moo-sical band", "A pasture party", "A bovine orchestra"],
      correctAnswer: 1,
      userAnswer:null
    },
    {
      question: "Why did the banana go to the doctor?",
      options: ["Because it had a split", "Because it had a bruise", "Because it wasn't peeling well", "Because it had a bad bunch"],
      correctAnswer: 2,
      userAnswer:null
    },
    {
      question: "What do you get when you cross a sheep and a kangaroo?",
      options: ["A kangasheep", "A woolly jumper", "A woolly hopper", "A jumping lamb"],
      correctAnswer: 1,
      userAnswer:null
    }    
  ])
  // const studentList = ref([
  //   {
  //     name: "Alice",
  //     surname: "Smith",
  //     scores: [90]
  //   },
  //   {
  //     name: "Bob",
  //     surname: "Johnson",
  //     scores: [60]
  //   },
  //   {
  //     name: "Charlie",
  //     surname: "Williams",
  //     scores: [77]
  //   },
  //   {
  //     name: "David",
  //     surname: "Brown",
  //     scores: [46]
  //   },
  //   {
  //     name: "Emma",
  //     surname: "Davis",
  //     scores: [93]
  //   },
  //   {
  //     name: "Frank",
  //     surname: "Garcia",
  //     scores: [58]
  //   },
  //   {
  //     name: "Grace",
  //     surname: "Hernandez",
  //     scores: [21]
  //   },
  //   {
  //     name: "Henry",
  //     surname: "Lee",
  //     scores: [67]
  //   },
  //   {
  //     name: "Isabella",
  //     surname: "Martinez",
  //     scores: [89]
  //   },
  //   {
  //     name: "Jack",
  //     surname: "Nguyen",
  //     scores: [80]
  //   }
  // ])
  const scores = [
    0,  5,  54,  67,  92,  81,  77,  83,  96,  62,
    70,  88,  61,  79,  85,  72,  90,  98,  81,  65,
    83,  71,  79,  87,  95,  58,  66,  76,  84,  93,
    68,  77,  89,  81,  92,  63,  70,  81,  88,  94,
    60,  73,  85,  78,  91,  79,  87,  96,  68,  72,
    80,  89,  73,  81,  92,  57,  66,  79,  85,  95,
    63,  77,  88,  83,  94,  69,  72,  81,  86,  91,
    56,  81,  73,  68,  93,  79,  89,  95,  71,  65,
    86,  74,  81,  90,  98,  59,  69,  78,  84,  92,
    77,  82,  65,  72,  89,  84,  91,  96,  70,  76
  ];
  //const doubleCount = computed(() => count.value * 2)
  const setAnswer = (index,userAnswer) =>{
    questionList.value[index].userAnswer=userAnswer
  }
  const addQuestion=(obj)=>{
    questionList.value.push(obj)
  }
  const calculateScore=()=>{
    const correctAnswer=questionList.value.filter(item=>item.correctAnswer===item.userAnswer)

    let result=(100/questionList.value.length)*correctAnswer.length

    return result
  }


  const resetQuiz=()=>{
    questionList.value.forEach(item=>{
      item.userAnswer=null
    })
    return true
  }


  return { 
    questionList, 
    scores,
    calculateScore,
    addQuestion, 
    setAnswer,  
    resetQuiz 
  }
})
