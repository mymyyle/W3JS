const numberButtons = document.querySelectorAll(".btn-number");
const operationButtons = document.querySelectorAll(".btn-operation");
const cButton = document.querySelector("#btn-c");
const displayScreen = document.querySelector("#screen");
const deleteButton = document.querySelector("#btn-delete");
const equalButton = document.querySelector("#btn-equal");

let currentOperand = "";
let previousOperand = "";
let operand = null;

const updateDisplay = () => {
  displayScreen.textContent =
    (currentOperand !== "" ? currentOperand : previousOperand) || "0";
};

const resetCalculate = () => {
  currentOperand = "";
  previousOperand = "";
  operand = null;
};

const deleteNumber = () => {
  if (currentOperand === "") return;
  currentOperand =
    currentOperand.length === 1 ? "" : currentOperand.slice(0, -1);
};

const compute = () => {
  let result;
  const prevNumber = parseFloat(previousOperand);
  const currentNumber = parseFloat(currentOperand);

  if (isNaN(prevNumber) || isNaN(currentNumber)) return;
  switch (operand) {
    case "+":
      result = prevNumber + currentNumber;
      break;
    case "-":
      result = prevNumber - currentNumber;
      break;
    case "x":
      result = prevNumber * currentNumber;
      break;
    case "/":
      result = prevNumber / currentNumber;
      break;
    default:
      break;
  }

  operand = null;
  previousOperand = "";
  currentOperand = result.toString();
};

const selectOperand = (newOperand) => {
  if (currentOperand === "") return;
  if (previousOperand !== "") compute();

  operand = newOperand;
  previousOperand = currentOperand;
  currentOperand = "";
};

const appendNumber = (number) => {
  if (
    (number === "." && currentOperand.includes(".")) ||
    (number === "0" && currentOperand === "")
  )
    return;

  currentOperand = currentOperand === "" ? number : currentOperand + number;
};

cButton.addEventListener("click", () => {
  resetCalculate();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});

equalButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});

numberButtons.forEach((numberButton) => {
  numberButton.addEventListener("click", () => {
    appendNumber(numberButton.textContent);
    updateDisplay();
  });
});

operationButtons.forEach((operationButton) => {
  operationButton.addEventListener("click", () => {
    selectOperand(operationButton.textContent);
    updateDisplay();
  });
});
