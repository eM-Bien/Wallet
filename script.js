const incomeSection = document.querySelector('.income-area')
const expensesSection = document.querySelector('.expenses-area')
const availableMoney = document.querySelector('.available-money')
const addTransactionPanel = document.querySelector('.add-transaction-panel')

const nameInput = document.querySelector('#name')
const amountInput = document.querySelector('#amount')
const categorySelect = document.querySelector('#category')

const addTransactionBtn = document.querySelector('.add-transaction')
const saveBtn = document.querySelector('.save')
const cancelBtn = document.querySelector('.cancel')
const deleteBtn = document.querySelector('.delete')
const deleteAllBtn = document.querySelector('.delete-all')

const options = document.querySelector('.options')
const lightBtn = document.querySelector('.light')
const darkBtn = document.querySelector('.dark')

let root = document.documentElement
let ID = 0
let categoryIcon
let selectedCategory
let moneyArr = [0]

const showPanel = () => {
  addTransactionPanel.classList.add('show-panel')
  addTransactionPanel.classList.remove('close-panel')
}

const closePanel = () => {
  addTransactionPanel.classList.remove('show-panel')
  addTransactionPanel.classList.add('close-panel')
  clearInputs()
}

const checkForm = () => {
  if (
    nameInput.value !== '' &&
    amountInput.value !== '' &&
    categorySelect.value !== 'none') {
        createNewTransaction()
  } else {
    alert('Wypełnij wszystkie pola!')
  }
}

const clearInputs = () => {
  nameInput.value = ''
  amountInput.value = ''
  categorySelect.selectedIndex = 0
}

const createNewTransaction = () => {
  const newTransaction = document.createElement('div')
  newTransaction.classList.add('transaction')
  newTransaction.setAttribute('id', ID)

  checkCategory(selectedCategory)

  newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value} zł
    <button class="delete" onclick="deteleTransaction(${ID})"><i class="fas fa-times"></i></button></p>
    `
    amountInput.value > 0 ? incomeSection.append(newTransaction) && newTransaction.classList.add('income'): expensesSection.append(newTransaction) && newTransaction.classList.add('expense');

    moneyArr.push(parseFloat(amountInput.value))

    countMoney(moneyArr)

    closePanel()
    ID++;
    clearInputs()
}

const selectCategory = () => {
    selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
}

const checkCategory = transaction => {
    switch(transaction) {
        case '[ + ] Przychód' :
            categoryIcon = '<i class="fas fa-money-bill-wave"></i>'
            break;

            case '[ - ] Zakupy' :
            categoryIcon = '<i class="fas fa-cart-arrow-down"></i>'
            break;

            case '[ - ] Jedzenie' :
            categoryIcon = '<i class="fas fa-hamburger"></i>'
            break;

            case '[ - ] Kino' :
            categoryIcon = '<i class="fas fa-film"></i>'
            break;
    }
}

const countMoney = money => {
    const newMoney = money.reduce((a, b) => a + b);
    availableMoney.textContent = `${newMoney} zł`
}

const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id);
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText)
    const indexOfTransaction = moneyArr.indexOf(transactionAmount)

    moneyArr.splice(indexOfTransaction, 1)

    transactionToDelete.classList.contains('income') ? incomeSection.removeChild(transactionToDelete) : expensesSection.removeChild(transactionToDelete)
    
    countMoney(moneyArr)
}

const deleteAllTransaction = () => {
  incomeSection.innerHTML = `<h3>Przychód:</h3>`
  expensesSection.innerHTML = `<h3>Wydatki:</h3>`
  availableMoney.textContent ='0 zł'
  moneyArr = [0]
}

const changeStyleToDark = () => {
  root.style.setProperty('--first-color', '#333')
  root.style.setProperty('--second-color', 'rgb(251 251 251)')
  root.style.setProperty('--border-color', 'rgb(251 251 251)')
  options.style.background = 'none'
  incomeSection.style.background = 'none'
  expensesSection.style.background = 'none'
}

const changeStyleToLight = () => {
  root.style.setProperty('--first-color', 'rgb(251 251 251)')
  root.style.setProperty('--second-color', '#333')
  root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)')
  options.style.background = '#fff'
  incomeSection.style.background = '#fff'
  expensesSection.style.background = '#fff'
}

addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', closePanel)
saveBtn.addEventListener('click', checkForm)
deleteAllBtn.addEventListener('click', deleteAllTransaction)
darkBtn.addEventListener('click', changeStyleToDark)
lightBtn.addEventListener('click', changeStyleToLight)
