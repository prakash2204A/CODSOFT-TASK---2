document.addEventListener('DOMContentLoaded', () => {
    const resultDisplay = document.getElementById('result');
    const operationDisplay = document.getElementById('operation');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let operator = '';
    let previousInput = '';
    let shouldResetDisplay = false;

    function updateDisplay() {
        resultDisplay.textContent = currentInput;
        operationDisplay.textContent = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput}`;
    }

    function handleButtonPress(event) {
        const action = event.target.getAttribute('data-action');

        if (!isNaN(action) || action === 'decimal') {
            handleNumber(action);
        } else {
            handleOperator(action);
        }
    }

    function handleNumber(number) {
        if (shouldResetDisplay) {
            currentInput = '';
            shouldResetDisplay = false;
        }

        if (number === 'decimal') {
            if (!currentInput.includes('.')) {
                currentInput += '.';
            }
        } else {
            if (currentInput === '0') {
                currentInput = number;
            } else {
                currentInput += number;
            }
        }
        updateDisplay();
    }

    function handleOperator(action) {
        switch (action) {
            case 'clear':
                currentInput = '0';
                operator = '';
                previousInput = '';
                updateDisplay();
                break;
            case 'backspace':
                currentInput = currentInput.slice(0, -1) || '0';
                updateDisplay();
                break;
            case 'equals':
                if (previousInput && operator && currentInput) {
                    currentInput = calculate(previousInput, operator, currentInput);
                    operator = '';
                    previousInput = '';
                    shouldResetDisplay = true;
                }
                updateDisplay();
                break;
            case 'percent':
                currentInput = (parseFloat(currentInput) / 100).toString();
                updateDisplay();
                break;
            case 'negate':
                currentInput = (parseFloat(currentInput) * -1).toString();
                updateDisplay();
                break;
            case 'sqrt':
                currentInput = Math.sqrt(parseFloat(currentInput)).toString();
                updateDisplay();
                break;
            default:
                if (currentInput) {
                    if (previousInput && operator) {
                        currentInput = calculate(previousInput, operator, currentInput);
                    }
                    operator = action;
                    previousInput = currentInput;
                    currentInput = '0';
                    shouldResetDisplay = true;
                }
                updateDisplay();
                break;
        }
    }

    function calculate(num1, operator, num2) {
        const a = parseFloat(num1);
        const b = parseFloat(num2);
        switch (operator) {
            case 'add':
                return (a + b).toString();
            case 'subtract':
                return (a - b).toString();
            case 'multiply':
                return (a * b).toString();
            case 'divide':
                return (a / b).toString();
            default:
                return '';
        }
    }

    function getOperatorSymbol(operator) {
        switch (operator) {
            case 'add':
                return '+';
            case 'subtract':
                return '-';
            case 'multiply':
                return '×';
            case 'divide':
                return '÷';
            default:
                return '';
        }
    }

    buttons.forEach(button => button.addEventListener('click', handleButtonPress));
});
