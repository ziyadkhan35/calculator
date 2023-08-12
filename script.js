const display = document.querySelector('.calculator-input')
const keys = document.querySelector('.calculator-keys')

let displayValue = '0'
let firstValue = null
let operator = null
let waitingSecondValue = false

uptadeDisplay()
function uptadeDisplay(){
    display.value = displayValue
}

keys.addEventListener('click',function(e){
    const element= e.target
    const value = element.value

    if(!element.matches('button')) return

    switch(value){
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value)
            break
        case '.':
            inputDecimal()
            break
        case 'clear':
            clear()
            break
        default:
            inputNumber(element.value)
    }
    uptadeDisplay()
    // if(element.classList.contains('operator')){
    //     //console.log('operator',element.value)
    //     handleOperator(element.value)
    //     uptadeDisplay()
    //     return
    // }

    // if(element.classList.contains('decimal')){
    //     //console.log('decimal',element.value)
    //     inputDecimal()
    //     uptadeDisplay()
    //     return
    // }

    // if(element.classList.contains('clear')){
    //     //console.log('clear',element.value)
    //     clear()
    //     uptadeDisplay()
    //     return
    // }

    //console.log(element.value)
    // inputNumber(element.value)
    // uptadeDisplay()
})

function handleOperator(nextOperator){
    const value = parseFloat(displayValue)

    if(operator && waitingSecondValue){
        operator = nextOperator
        return
    }

    if(firstValue === null){
        firstValue = value
    }else if(operator){
        const result = calculate(firstValue, value, operator)

        displayValue = `${parseFloat(result.toFixed(7))}`
        firstValue = result
    }
    waitingSecondValue = true
    operator = nextOperator

    console.log(displayValue, firstValue, operator, waitingSecondValue)
}

function calculate(first, second, operator){
    if(operator === '+'){
        return first + second
    }else if(operator === '-'){
        return first - second
    }else if(operator === '*'){
        return first * second
    }else if(operator === '/'){
        return first / second
    }

    return second
}

function inputNumber(num){
    if(waitingSecondValue){
        displayValue = num
        waitingSecondValue = false
    }else{
        displayValue = displayValue === '0' ? num : displayValue + num
    }
}

function inputDecimal(){
    if(!displayValue.includes('.')){
        displayValue += '.'
    }
}

function clear(){
    displayValue = '0'
}
