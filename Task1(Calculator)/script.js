// Calculator Application
class Calculator {
    constructor() {
        this.display = document.getElementById('display');
        this.expression = document.getElementById('expression');
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.shouldResetDisplay = false;
        this.history = this.loadHistory();
        this.scientificMode = false;
        
        this.initializeEventListeners();
        this.initializeKeyboard();
        this.initializeModals();
    }

    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', () => {
                this.inputNumber(button.dataset.number);
            });
        });

        // Operator buttons
        document.querySelectorAll('[data-operator]').forEach(button => {
            button.addEventListener('click', () => {
                this.inputOperator(button.dataset.operator);
            });
        });

        // Function buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', () => {
                this.executeAction(button.dataset.action);
            });
        });

        // Scientific function buttons
        document.querySelectorAll('[data-function]').forEach(button => {
            button.addEventListener('click', () => {
                this.executeScientificFunction(button.dataset.function);
            });
        });

        // Icon buttons
        document.getElementById('historyBtn').addEventListener('click', () => {
            this.toggleHistoryPanel();
        });

        document.getElementById('shortcutsBtn').addEventListener('click', () => {
            this.toggleScientificPanel();
        });

        document.getElementById('advancedBtn').addEventListener('click', () => {
            this.toggleModal('shortcutsModal');
        });
    }

    initializeKeyboard() {
        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            
            // Numbers
            if (e.key >= '0' && e.key <= '9') {
                this.inputNumber(e.key);
            }
            
            // Operators
            else if (e.key === '+') this.inputOperator('+');
            else if (e.key === '-') this.inputOperator('-');
            else if (e.key === '*') this.inputOperator('*');
            else if (e.key === '/') this.inputOperator('/');
            
            // Functions
            else if (e.key === 'Enter' || e.key === '=') this.executeAction('equals');
            else if (e.key === 'Escape') this.executeAction('clear');
            else if (e.key === 'Backspace') this.executeAction('delete');
            else if (e.key === '.') this.executeAction('decimal');
            
            // Shortcuts
            else if (e.ctrlKey && e.key === 'h') this.toggleHistoryPanel();
            else if (e.ctrlKey && e.key === 's') this.toggleScientificPanel();
        });
    }

    initializeModals() {
        // Close modals when clicking outside or on close button
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('modal-close')) {
                    this.closeModal(modal.id);
                }
            });
        });

        // History functions
        document.getElementById('exportHistory').addEventListener('click', () => {
            this.exportHistory();
        });

        document.getElementById('clearHistory').addEventListener('click', () => {
            this.clearHistory();
        });

        // History panel functions
        if (document.getElementById('exportHistoryPanel')) {
            document.getElementById('exportHistoryPanel').addEventListener('click', () => {
                this.exportHistory();
            });
        }

        if (document.getElementById('clearHistoryPanel')) {
            document.getElementById('clearHistoryPanel').addEventListener('click', () => {
                this.clearHistory();
                this.updateHistoryPanelDisplay();
            });
        }
    }

    inputNumber(number) {
        if (this.shouldResetDisplay) {
            this.currentInput = '';
            this.shouldResetDisplay = false;
        }

        if (this.currentInput === '0' && number !== '0') {
            this.currentInput = number;
        } else if (this.currentInput !== '0') {
            this.currentInput += number;
        }

        this.updateDisplay();
    }

    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === null) {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.calculate(currentValue, inputValue, this.operator);

            this.currentInput = String(newValue);
            this.previousInput = newValue;
            this.updateDisplay();
        }

        this.shouldResetDisplay = true;
        this.operator = nextOperator;
        this.updateExpression();
    }

    executeAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'delete':
                this.delete();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'negate':
                this.negate();
                break;
            case 'equals':
                this.calculateResult();
                break;
        }
    }

    executeScientificFunction(func) {
        const value = parseFloat(this.currentInput);
        let result;

        try {
            switch (func) {
                case 'sin':
                    result = Math.sin(this.toRadians(value));
                    break;
                case 'cos':
                    result = Math.cos(this.toRadians(value));
                    break;
                case 'tan':
                    result = Math.tan(this.toRadians(value));
                    break;
                case 'asin':
                    result = this.toDegrees(Math.asin(value));
                    break;
                case 'acos':
                    result = this.toDegrees(Math.acos(value));
                    break;
                case 'atan':
                    result = this.toDegrees(Math.atan(value));
                    break;
                case 'sinh':
                    result = Math.sinh(value);
                    break;
                case 'cosh':
                    result = Math.cosh(value);
                    break;
                case 'tanh':
                    result = Math.tanh(value);
                    break;
                case 'log':
                    result = Math.log10(value);
                    break;
                case 'ln':
                    result = Math.log(value);
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    break;
                case 'pow':
                    result = Math.pow(value, 2);
                    break;
                case 'exp':
                    result = Math.exp(value);
                    break;
                case 'pow10':
                    result = Math.pow(10, value);
                    break;
                case 'factorial':
                    result = this.factorial(value);
                    break;
                case 'abs':
                    result = Math.abs(value);
                    break;
                case 'floor':
                    result = Math.floor(value);
                    break;
                case 'ceil':
                    result = Math.ceil(value);
                    break;
                case 'pi':
                    result = Math.PI;
                    break;
                case 'e':
                    result = Math.E;
                    break;
                default:
                    throw new Error('Unknown function');
            }

            if (isNaN(result) || !isFinite(result)) {
                throw new Error('Invalid operation');
            }

            const expression = `${func}(${this.currentInput})`;
            this.addToHistory(expression, result);
            
            this.currentInput = String(this.formatNumber(result));
            this.shouldResetDisplay = true;
            this.updateDisplay();
            
        } catch (error) {
            this.showError('Error');
        }
    }

    calculate(firstOperand, secondOperand, operator) {
        switch (operator) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '*':
                return firstOperand * secondOperand;
            case '/':
                if (secondOperand === 0) {
                    throw new Error('Division by zero');
                }
                return firstOperand / secondOperand;
            default:
                return secondOperand;
        }
    }

    calculateResult() {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput !== null && this.operator) {
            try {
                const expression = `${this.previousInput} ${this.operator} ${this.currentInput}`;
                const result = this.calculate(this.previousInput, inputValue, this.operator);
                
                if (!isFinite(result)) {
                    throw new Error('Invalid result');
                }

                this.addToHistory(expression, result);
                
                this.currentInput = String(this.formatNumber(result));
                this.previousInput = null;
                this.operator = null;
                this.shouldResetDisplay = true;
                this.updateDisplay();
                this.clearExpression();
                
            } catch (error) {
                this.showError(error.message === 'Division by zero' ? 'Cannot divide by zero' : 'Error');
            }
        }
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.shouldResetDisplay = false;
        this.updateDisplay();
        this.clearExpression();
    }

    delete() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.shouldResetDisplay) {
            this.currentInput = '0';
            this.shouldResetDisplay = false;
        }

        if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
            this.updateDisplay();
        }
    }

    negate() {
        if (this.currentInput !== '0') {
            if (this.currentInput.startsWith('-')) {
                this.currentInput = this.currentInput.substring(1);
            } else {
                this.currentInput = '-' + this.currentInput;
            }
            this.updateDisplay();
        }
    }

    updateDisplay() {
        this.display.textContent = this.currentInput;
        this.display.classList.remove('error');
    }

    updateExpression() {
        if (this.previousInput !== null && this.operator) {
            this.expression.textContent = `${this.previousInput} ${this.operator}`;
        }
    }

    clearExpression() {
        this.expression.textContent = '';
    }

    showError(message) {
        this.display.textContent = message;
        this.display.classList.add('error');
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.shouldResetDisplay = true;
        setTimeout(() => {
            this.display.classList.remove('error');
            this.updateDisplay();
        }, 2000);
    }

    formatNumber(num) {
        if (num.toString().length > 12) {
            return parseFloat(num.toPrecision(12));
        }
        return num;
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    toDegrees(radians) {
        return radians * (180 / Math.PI);
    }

    factorial(n) {
        if (n < 0 || n !== Math.floor(n)) {
            throw new Error('Invalid input for factorial');
        }
        if (n > 170) {
            throw new Error('Number too large for factorial');
        }
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    // History Management
    addToHistory(expression, result) {
        const historyItem = {
            expression: expression,
            result: this.formatNumber(result),
            timestamp: new Date().toLocaleString()
        };
        
        this.history.unshift(historyItem);
        if (this.history.length > 50) {
            this.history = this.history.slice(0, 50);
        }
        
        this.saveHistory();
        this.updateHistoryDisplay();
        this.updateHistoryPanelDisplay();
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('calculatorHistory');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
        } catch (error) {
            console.error('Failed to save history:', error);
        }
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<div class="text-gray-500 text-center py-8">No calculations yet</div>';
            return;
        }

        historyList.innerHTML = this.history.map(item => `
            <div class="history-item" onclick="calculator.useHistoryResult('${item.result}')">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">= ${item.result}</div>
                <div class="text-xs text-gray-400 mt-1">${item.timestamp}</div>
            </div>
        `).join('');
    }

    useHistoryResult(result) {
        this.currentInput = result;
        this.shouldResetDisplay = true;
        this.updateDisplay();
        this.closeModal('historyModal');
        // Also close history panel if it's open
        const panel = document.getElementById('historyPanel');
        if (!panel.classList.contains('hidden')) {
            this.toggleHistoryPanel();
        }
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.updateHistoryDisplay();
        this.updateHistoryPanelDisplay();
    }

    exportHistory() {
        if (this.history.length === 0) {
            alert('No history to export');
            return;
        }

        const content = this.history.map(item => 
            `${item.expression} = ${item.result} (${item.timestamp})`
        ).join('\n');

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calculator-history-${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Modal Management
    toggleModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal.classList.contains('active')) {
            this.closeModal(modalId);
        } else {
            this.openModal(modalId);
        }
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.add('active');
        
        if (modalId === 'historyModal') {
            this.updateHistoryDisplay();
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }

    toggleScientificPanel() {
        const panel = document.getElementById('scientificPanel');
        const btn = document.getElementById('shortcutsBtn');
        
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            panel.classList.add('hidden');
            btn.classList.remove('active');
        } else {
            panel.classList.remove('hidden');
            panel.classList.add('active');
            btn.classList.add('active');
        }
    }

    toggleHistoryPanel() {
        const panel = document.getElementById('historyPanel');
        const btn = document.getElementById('historyBtn');
        
        if (panel.classList.contains('active')) {
            panel.classList.remove('active');
            panel.classList.add('hidden');
            btn.classList.remove('active');
        } else {
            panel.classList.remove('hidden');
            panel.classList.add('active');
            btn.classList.add('active');
            this.updateHistoryPanelDisplay();
        }
    }

    updateHistoryPanelDisplay() {
        const historyList = document.getElementById('historyPanelList');
        
        if (!historyList) {
            console.log('History panel list not found');
            return;
        }
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<div class="text-gray-500 text-center text-xs py-8">No calculations yet</div>';
            return;
        }

        historyList.innerHTML = this.history.map(item => `
            <div class="history-item" onclick="calculator.useHistoryResult('${item.result}')">
                <div class="history-expression text-xs">${item.expression}</div>
                <div class="history-result text-sm font-semibold">= ${item.result}</div>
                <div class="text-xs text-gray-400 mt-1">${item.timestamp}</div>
            </div>
        `).join('');
    }
}

// Initialize the calculator when the page loads
let calculator;
document.addEventListener('DOMContentLoaded', () => {
    calculator = new Calculator();
});

// Handle window resize for responsive behavior
window.addEventListener('resize', () => {
    const panel = document.getElementById('scientificPanel');
    const modal = document.getElementById('advancedModal');
    
    if (window.innerWidth > 640) {
        modal.classList.remove('active');
    }
});