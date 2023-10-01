const continueBtn = document.getElementById("continue");
const readyEl = document.getElementById("ready");
const exitQuizEl = document.getElementById("exit-quiz");
const yesBtn = document.getElementById("yes");
const goodLuckEl = document.getElementById("good-luck")



continueBtn.addEventListener("click", ()=>{
  readyEl.style.display = "block";
  exitQuizEl.disabled = true;
})

yesBtn.addEventListener("click", () => {
  goodLuckEl.style.display = "block";
  readyEl.style.display = "none";
})