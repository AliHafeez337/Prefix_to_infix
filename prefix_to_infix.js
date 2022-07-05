
/**
 * Converting a prefix expression to infix notation
 * input: ["<", ["==", "c", ["<", ["+", "u", "n"], "b"]], ["==", ["<=", "p", "e"], "d"]]
 * output: (c==((u+n)<b))<((p<=e)==d)
 * 
 * 
 * Developed by alihafeez337@gmail.com
 */

// var question = [ "OR", ["<", "a", "b"], [ "AND", ["==", "c", "d"], ["!=", "e", "f"] ] ];
var question = ["<", ["==", "c", ["<", ["+", "u", "n"], "b"]], ["==", ["<=", "p", "e"], "d"]];

const swapp = arr => {
  if (typeof arr === 'string') {
    return arr;
  }
  if (arr && arr.length === 3) {
    return [arr[1], arr[0], arr[2]];
  } else {
    throw new Error("Invalid equation.");
  }
};
const doesHaveArray = arr => {
  if (typeof arr === 'string') {
    return arr;
  }
  let hasArrays = arr.filter(el => typeof el !== 'string' && el.length).length;
  return hasArrays > 0;
}
const addBracket = () => {
  let newQuestion = [];
  question.forEach(el => {
    if (typeof el === 'string') {
      newQuestion.push(el);
    } else {
      newQuestion.push('(');
      newQuestion.push(el);
      newQuestion.push(')');
    }
  })
  question = newQuestion;
}

try {
  question = swapp(question);
  
  addBracket();

  while (doesHaveArray(question)) {
    let tempQuestionEls = [];
    
    question.forEach((el, i) => {
      tempQuestionEls[i] = swapp(el);
    })
    
    question = [];
    tempQuestionEls.forEach(el => {
      if (typeof el === 'string') {
        question.push(el);
      } else {
        question.push(...el);
      }
    })
    addBracket();
  }

  let answer = '';
  question.forEach(el => answer = answer.concat(el));
  console.log('answer: ', answer);

} catch(e) {
  console.log(e);
}
