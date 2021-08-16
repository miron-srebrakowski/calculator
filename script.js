
class Calculator{
    constructor(prevText, currText){
        this.prevText = prevText
        this.currText = currText
        this.invalid = false
        this.clear()
    }

    clear(){
        this.prevOperand = ''
        this.currOperand = ''
        this.operation = undefined
    }

    appendNum(num){
        if (num === '.' && this.currOperand.includes('.')){
            return
        }
        this.currOperand = this.currOperand.toString() + num.toString()
    }

    selectOperation(operation){
        if (this.currOperand === ''){
            return
        }
        if (this.prevOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currOperand
        this.currOperand = ''
    }

    sqrt(){
        if (this.currOperand < 0){
            this.invalid = true
        } else {
            this.operation = 'SQRT'
            this.currOperand = this.currOperand ** 0.5
        }    
    }

    compute(){
        let total
        const prev = parseFloat(this.prevOperand)
        const curr = parseFloat(this.currOperand)
        if (isNaN(prev) || isNaN(curr)){
            return
        }
        switch(this.operation){
            case '+':
                total = prev + curr
                break
            case '-':
                total = prev - curr
                break
            case '*':
                total = prev * curr
                break
            case '/':
                if (curr === 0){
                    this.invalid = true
                    total = 0
                } else {
                    total = prev / curr
                }
                break
            case '%':
                total = prev % curr
                break
            case '^':
                total = prev ** curr
                break
            default:
                return
        }

        this.currOperand = total
        this.operation = undefined
        this.prevOperand = ''

    }


    updateDisplay(){
        if (this.invalid === true){
            this.currText.innerText = 'Invalid operation!'
            this.invalid = false
        } else {
            this.currText.innerText = this.currOperand
            if (this.operation != null){
                this.prevText.innerText = `${this.prevOperand} ${this.operation}`
            } else{
                this.prevText.innerText = ''
            }
        }
        
    }
}

const numButton = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const acButton = document.querySelector('[data-ac]')
const sqrtButton = document.querySelector('[data-sqrt]')
const currText = document.querySelector('[data-curr]')
const prevText = document.querySelector('[data-prev]')

const calculator = new Calculator(prevText, currText)

numButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

acButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

sqrtButton.addEventListener('click', button => {
    calculator.sqrt()
    calculator.updateDisplay()
})