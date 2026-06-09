let currentValue = "0";
let previousValue = "";
let operator = null;
let justCalculated = false; // Flag para indicar se o resultado acabou de ser calculado

updateDisplay();

function updateDisplay() {
    const display = document.getElementById("result"); // pega o resultado 
    display.textContent = currentValue;
}

function inputNumber(value) {
    if (currentValue == "0" || justCalculated) {
        currentValue = value;
        justCalculated = false; // Reseta a flag após inserir um número
    } else {
        currentValue += value;
    }
}


function inputDecimal() {
    if (currentValue.includes(".")) return;
    currentValue += ".";
}

function chooseOperator(op) {
    if (operator !== null) {
        calculate();
    }

    previousValue = currentValue;
    operator = op;
    currentValue = "0";
    justCalculated = false; // Reseta a flag ao escolher um operador
}

function calculate() {
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "−":
            result = prev - current;
            break;
        case "×":
            result = prev * current;
            break;
        case "÷":
            if (current === 0) {
                alert("Erro: Divisão por zero");
                return;
            }
            result = prev / current;
            break;
        default:
            return;
    }
    currentValue = result.toString();
    operator = null;
    justCalculated = true;
}

function clearDisplay() {
    currentValue = "0";
    previousValue = "";
    operator = null;
    justCalculated = false; // Reseta a flag ao limpar a calculadora
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = "0";
    }
}

document.querySelector('.buttons').addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const text = btn.textContent.trim();

  if (!isNaN(text)) {
    // é número
    inputNumber(text);

  } else if (text === '.') {
    inputDecimal();

  } else if (['+', '−', '×', '÷'].includes(text)) {
    // é operador
    chooseOperator(text);

  } else if (text === '=') {
    calculate();

  } else if (text === 'C') {
    clearDisplay();

  } else if (text === '+/−') {
    currentValue = String(parseFloat(currentValue) * -1);

  } else if (text === '%') {
    currentValue = String(parseFloat(currentValue) / 100);
  }

  updateDisplay();
});
