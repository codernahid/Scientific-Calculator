class CasioCalculator {
    constructor() {
        this.currentDisplay = '0';
        this.previousDisplay = '';
        this.currentOperation = null;
        this.memory = 0;
        this.angleMode = 'DEG'; // DEG, RAD, GRAD
        this.shiftMode = false;
        this.alphaMode = false;
        this.currentMode = 'calculation';
        this.statsData = [];
        this.lastResult = null;
        this.waitingForOperand = false;
        this.decimalPlaces = 10;

        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
    }

    initializeElements() {
        this.mainDisplay = document.getElementById('mainDisplay');
        this.secondaryDisplay = document.getElementById('secondaryDisplay');
        this.memoryIndicator = document.getElementById('memoryIndicator');
        this.angleModeElement = document.getElementById('angleMode');
        this.modePanel = document.getElementById('modePanel');
        this.statsPanel = document.getElementById('statsPanel');
        this.statsInput = document.getElementById('statsInput');
        this.addDataButton = document.getElementById('addData');
    }

    bindEvents() {
        // Number keys
        document.querySelectorAll('.number-key').forEach(key => {
            key.addEventListener('click', () => this.inputNumber(key.dataset.value));
        });

        // Operator keys
        document.querySelectorAll('.operator-key').forEach(key => {
            key.addEventListener('click', () => this.inputOperator(key.dataset.action));
        });

        // Scientific function keys
        document.querySelectorAll('.scientific-key').forEach(key => {
            key.addEventListener('click', () => this.inputFunction(key.dataset.action));
        });

        // Control keys
        document.querySelectorAll('.key[data-action]').forEach(key => {
            const action = key.dataset.action;
            if (!['add', 'subtract', 'multiply', 'divide', 'sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'power', 'reciprocal', 'factorial', 'abs', 'exp', 'pi', 'e', 'rand', 'mod', 'gcd'].includes(action)) {
                key.addEventListener('click', () => this.handleAction(action));
            }
        });

        // Mode panel
        document.querySelectorAll('.mode-option').forEach(option => {
            option.addEventListener('click', () => this.setMode(option.dataset.mode));
        });

        // Statistics panel
        this.addDataButton.addEventListener('click', () => this.addStatsData());
        this.statsInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addStatsData();
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    handleKeyboard(e) {
        const key = e.key;
        
        if (key >= '0' && key <= '9') {
            this.inputNumber(key);
        } else if (key === '.') {
            this.inputDecimal();
        } else if (key === '+') {
            this.inputOperator('add');
        } else if (key === '-') {
            this.inputOperator('subtract');
        } else if (key === '*') {
            this.inputOperator('multiply');
        } else if (key === '/') {
            this.inputOperator('divide');
        } else if (key === 'Enter' || key === '=') {
            this.calculate();
        } else if (key === 'Escape') {
            this.clear();
        } else if (key === 'Backspace') {
            this.delete();
        }
    }

    inputNumber(num) {
        if (this.waitingForOperand) {
            this.currentDisplay = num;
            this.waitingForOperand = false;
        } else {
            this.currentDisplay = this.currentDisplay === '0' ? num : this.currentDisplay + num;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.currentDisplay = '0.';
            this.waitingForOperand = false;
        } else if (this.currentDisplay.indexOf('.') === -1) {
            this.currentDisplay += '.';
        }
        this.updateDisplay();
    }

    inputOperator(operator) {
        const inputValue = parseFloat(this.currentDisplay);

        if (this.previousDisplay === '' && !isNaN(inputValue)) {
            this.previousDisplay = inputValue;
        } else if (this.currentOperation) {
            const result = this.performCalculation();
            this.currentDisplay = String(result);
            this.previousDisplay = result;
        }

        this.waitingForOperand = true;
        this.currentOperation = operator;
        this.updateDisplay();
    }

    inputFunction(func) {
        const inputValue = parseFloat(this.currentDisplay);
        let result;

        switch (func) {
            case 'sin':
                result = Math.sin(this.toRadians(inputValue));
                break;
            case 'cos':
                result = Math.cos(this.toRadians(inputValue));
                break;
            case 'tan':
                result = Math.tan(this.toRadians(inputValue));
                break;
            case 'log':
                result = Math.log10(inputValue);
                break;
            case 'ln':
                result = Math.log(inputValue);
                break;
            case 'sqrt':
                result = Math.sqrt(inputValue);
                break;
            case 'power':
                result = Math.pow(inputValue, 2);
                break;
            case 'reciprocal':
                result = 1 / inputValue;
                break;
            case 'factorial':
                result = this.factorial(inputValue);
                break;
            case 'abs':
                result = Math.abs(inputValue);
                break;
            case 'exp':
                result = Math.exp(inputValue);
                break;
            case 'pi':
                result = Math.PI;
                break;
            case 'e':
                result = Math.E;
                break;
            case 'rand':
                result = Math.random();
                break;
            case 'mod':
                // For mod, we'll need a second operand
                this.previousDisplay = inputValue;
                this.currentOperation = 'mod';
                this.waitingForOperand = true;
                this.updateDisplay();
                return;
            case 'gcd':
                // For GCD, we'll need a second operand
                this.previousDisplay = inputValue;
                this.currentOperation = 'gcd';
                this.waitingForOperand = true;
                this.updateDisplay();
                return;
        }

        this.currentDisplay = String(this.formatNumber(result));
        this.lastResult = result;
        this.updateDisplay();
    }

    performCalculation() {
        const inputValue = parseFloat(this.currentDisplay);
        const previousValue = parseFloat(this.previousDisplay);

        if (isNaN(previousValue) || isNaN(inputValue)) {
            return inputValue;
        }

        let result;
        switch (this.currentOperation) {
            case 'add':
                result = previousValue + inputValue;
                break;
            case 'subtract':
                result = previousValue - inputValue;
                break;
            case 'multiply':
                result = previousValue * inputValue;
                break;
            case 'divide':
                result = previousValue / inputValue;
                break;
            case 'mod':
                result = previousValue % inputValue;
                break;
            case 'gcd':
                result = this.gcd(previousValue, inputValue);
                break;
            default:
                result = inputValue;
        }

        return this.formatNumber(result);
    }

    calculate() {
        if (!this.currentOperation) return;

        const result = this.performCalculation();
        this.currentDisplay = String(result);
        this.previousDisplay = '';
        this.currentOperation = null;
        this.waitingForOperand = true;
        this.lastResult = result;
        this.updateDisplay();
    }

    clear() {
        this.currentDisplay = '0';
        this.previousDisplay = '';
        this.currentOperation = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    delete() {
        if (this.currentDisplay.length > 1) {
            this.currentDisplay = this.currentDisplay.slice(0, -1);
        } else {
            this.currentDisplay = '0';
        }
        this.updateDisplay();
    }

    handleAction(action) {
        switch (action) {
            case 'mode':
                this.showModePanel();
                break;
            case 'setup':
                this.toggleAngleMode();
                break;
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'memory':
                this.handleMemory();
                break;
            case 'function':
                this.showFunctionMenu();
                break;
            case 'shift':
                this.toggleShiftMode();
                break;
            case 'alpha':
                this.toggleAlphaMode();
                break;
            case 'equals':
                this.calculate();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
        }
    }

    showModePanel() {
        this.modePanel.classList.add('active');
    }

    setMode(mode) {
        this.currentMode = mode;
        this.modePanel.classList.remove('active');
        
        if (mode === 'statistics') {
            this.statsPanel.classList.add('active');
        } else {
            this.statsPanel.classList.remove('active');
        }
        
        this.clear();
    }

    toggleAngleMode() {
        const modes = ['DEG', 'RAD', 'GRAD'];
        const currentIndex = modes.indexOf(this.angleMode);
        this.angleMode = modes[(currentIndex + 1) % modes.length];
        this.angleModeElement.textContent = this.angleMode;
    }

    toRadians(degrees) {
        switch (this.angleMode) {
            case 'DEG':
                return degrees * Math.PI / 180;
            case 'RAD':
                return degrees;
            case 'GRAD':
                return degrees * Math.PI / 200;
            default:
                return degrees;
        }
    }

    handleMemory() {
        const currentValue = parseFloat(this.currentDisplay);
        
        if (this.shiftMode) {
            // Memory recall
            this.currentDisplay = String(this.memory);
            this.updateDisplay();
        } else {
            // Memory store
            this.memory = currentValue;
            this.memoryIndicator.textContent = 'M';
            this.memoryIndicator.classList.add('active');
        }
    }

    toggleShiftMode() {
        this.shiftMode = !this.shiftMode;
        document.querySelectorAll('.shift-key').forEach(key => {
            key.style.background = this.shiftMode ? 
                'linear-gradient(145deg, #e74c3c, #c0392b)' : 
                'linear-gradient(145deg, #27ae60, #229954)';
        });
    }

    toggleAlphaMode() {
        this.alphaMode = !this.alphaMode;
        document.querySelectorAll('.alpha-key').forEach(key => {
            key.style.background = this.alphaMode ? 
                'linear-gradient(145deg, #e74c3c, #c0392b)' : 
                'linear-gradient(145deg, #27ae60, #229954)';
        });
    }

    showFunctionMenu() {
        // This could be expanded to show a function menu
        console.log('Function menu - to be implemented');
    }

    addStatsData() {
        const value = parseFloat(this.statsInput.value);
        if (!isNaN(value)) {
            this.statsData.push(value);
            this.updateStatsDisplay();
            this.statsInput.value = '';
        }
    }

    updateStatsDisplay() {
        const count = this.statsData.length;
        const sum = this.statsData.reduce((a, b) => a + b, 0);
        const sumSquares = this.statsData.reduce((a, b) => a + b * b, 0);
        const mean = count > 0 ? sum / count : 0;
        const variance = count > 0 ? (sumSquares / count) - (mean * mean) : 0;
        const stdDev = Math.sqrt(Math.abs(variance));

        document.getElementById('count').textContent = count;
        document.getElementById('sum').textContent = this.formatNumber(sum);
        document.getElementById('sumSquares').textContent = this.formatNumber(sumSquares);
        document.getElementById('mean').textContent = this.formatNumber(mean);
        document.getElementById('stdDev').textContent = this.formatNumber(stdDev);
    }

    factorial(n) {
        if (n < 0 || n !== Math.floor(n)) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    gcd(a, b) {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    formatNumber(num) {
        if (isNaN(num) || !isFinite(num)) return 'Error';
        
        // Handle very large or very small numbers
        if (Math.abs(num) >= 1e10 || (Math.abs(num) < 1e-10 && num !== 0)) {
            return num.toExponential(6);
        }
        
        // Regular formatting
        const rounded = Math.round(num * Math.pow(10, this.decimalPlaces)) / Math.pow(10, this.decimalPlaces);
        return rounded.toString();
    }

    updateDisplay() {
        this.mainDisplay.textContent = this.currentDisplay;
        this.secondaryDisplay.textContent = this.previousDisplay + (this.currentOperation ? ' ' + this.getOperationSymbol() : '');
        
        // Add update animation
        this.mainDisplay.classList.add('updated');
        setTimeout(() => this.mainDisplay.classList.remove('updated'), 200);
    }

    getOperationSymbol() {
        const symbols = {
            'add': '+',
            'subtract': '−',
            'multiply': '×',
            'divide': '÷',
            'mod': 'mod',
            'gcd': 'GCD'
        };
        return symbols[this.currentOperation] || '';
    }
}

// Initialize the calculator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new CasioCalculator();
});

// Close panels when clicking outside
document.addEventListener('click', (e) => {
    const calculator = document.querySelector('.calculator');
    const modePanel = document.getElementById('modePanel');
    const statsPanel = document.getElementById('statsPanel');
    
    if (!calculator.contains(e.target)) {
        modePanel.classList.remove('active');
        statsPanel.classList.remove('active');
    }
}); 