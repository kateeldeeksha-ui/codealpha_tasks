class Calculator {
    constructor(previousOperandElement, currentOperandElement) {
        this.previousOperandElement = previousOperandElement;
        this.currentOperandElement = currentOperandElement;
        this.clear();
    }

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
        this.updateDisplay();
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        this.updateDisplay();
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
        this.updateDisplay();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
        this.updateDisplay();
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
        this.updateDisplay();
    }

    percentage() {
        const current = parseFloat(this.currentOperand);
        if (isNaN(current)) return;
        this.currentOperand = (current / 100).toString();
        this.updateDisplay();
    }

    updateDisplay() {
        this.currentOperandElement.innerText = this.currentOperand || '0';
        if (this.operation != null) {
            this.previousOperandElement.innerText =
                `${this.previousOperand} ${this.operation}`;
        } else {
            this.previousOperandElement.innerText = this.previousOperand;
        }
    }

    getDisplayValue() {
        return this.currentOperandElement.innerText;
    }
}

// DOM Elements
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const functionButtons = document.querySelectorAll('[data-action]');

// Initialize Calculator
const calculator = new Calculator(previousOperandElement, currentOperandElement);

// Number Button Events
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
    });
});

// Operator Button Events
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
    });
});

// Function Button Events
functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.dataset.action;
        if (action === 'clear') calculator.clear();
        if (action === 'delete') calculator.delete();
        if (action === 'equals') calculator.compute();
        if (action === 'percentage') calculator.percentage();
    });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    // Number keys
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
    }

    // Decimal point
    if (e.key === '.') {
        e.preventDefault();
        calculator.appendNumber('.');
    }

    // Operations
    if (e.key === '+') {
        e.preventDefault();
        calculator.chooseOperation('+');
    }

    if (e.key === '-') {
        e.preventDefault();
        calculator.chooseOperation('-');
    }

    if (e.key === '*') {
        e.preventDefault();
        calculator.chooseOperation('×');
    }

    if (e.key === '/') {
        e.preventDefault();
        calculator.chooseOperation('÷');
    }

    // Equals
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.compute();
    }

    // Clear
    if (e.key === 'c' || e.key === 'C' || e.key === 'Escape') {
        e.preventDefault();
        calculator.clear();
    }

    // Delete
    if (e.key === 'Backspace') {
        e.preventDefault();
        calculator.delete();
    }
});

// Initialize display
calculator.updateDisplay();
