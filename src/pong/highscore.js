var data = {};

module.exports = function(initialData) {
  if(data.finished){
    Object.unobserve(data, observerFunctionFinished)
  }
  data = initialData;
  Object.observe(data, observerFunctionFinished, ['update']);
}


var observerFunctionFinished = function(changes){
  changes.forEach(function(change) {
    if(change.name === "finished" && data.finished){
      document.querySelector(".paddle-left").classList.add("blurred");
      document.querySelector(".paddle-right").classList.add("blurred");
      document.querySelector(".ball").classList.add("blurred");
      document.querySelector(".name").classList.remove("hidden");
      document.querySelector(".input").focus();
      document.querySelector(".form").addEventListener("submit", formSubmitted);
    }
  });
}

var formSubmitted = function(e) {
  e.preventDefault();
  document.querySelector(".paddle-left").classList.remove("blurred");
  document.querySelector(".paddle-right").classList.remove("blurred");
  document.querySelector(".ball").classList.remove("blurred");
  document.querySelector(".name").classList.add("hidden");
  var input = document.querySelector(".input");
  var name = input.value;
  input.value = "";
  document.querySelector(".form").removeEventListener("submit", formSubmitted);

  var myDataRef = new Firebase('https://burning-torch-5939.firebaseio.com/');
  myDataRef.push({name: name, score: Math.max(data.player1, data.player2)});
  return false;
}
