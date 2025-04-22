import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {optionId: 'INCOME', displayText: 'Income'},
  {optionId: 'EXPENSES', displayText: 'Expenses'},
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeType = event => {
    this.setState({optionId: event.target.value})
  }

  getBalance = () => {
    const {transactionsList} = this.state
    const income = transactionsList
      .filter(each => each.type === 'Income')
      .reduce((acc, item) => acc + item.amount, 0)
    const expenses = transactionsList
      .filter(each => each.type === 'Expenses')
      .reduce((acc, item) => acc + item.amount, 0)
    return income - expenses
  }

  getIncome = () => {
    const {transactionsList} = this.state
    return transactionsList
      .filter(each => each.type === 'Income')
      .reduce((acc, item) => acc + item.amount, 0)
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    return transactionsList
      .filter(each => each.type === 'Expenses')
      .reduce((acc, item) => acc + item.amount, 0)
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeText = transactionTypeOptions.find(
      option => option.optionId === optionId,
    ).displayText

    if (titleInput !== '' && amountInput !== '') {
      const newTransaction = {
        id: uuidv4(),
        title: titleInput,
        amount: parseFloat(amountInput),
        type: typeText,
      }

      this.setState(prevState => ({
        transactionsList: [...prevState.transactionsList, newTransaction],
        titleInput: '',
        amountInput: '',
        optionId: transactionTypeOptions[0].optionId,
      }))
    }
  }

  onDeleteTransaction = id => {
    this.setState(prevState => ({
      transactionsList: prevState.transactionsList.filter(
        item => item.id !== id,
      ),
    }))
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state

    const balance = this.getBalance()
    const income = this.getIncome()
    const expenses = this.getExpenses()

    return (
      <div className="app-container">
        <div className="money-manager-header">
          <h1>Hi, Richard</h1>
          <p>
            Welcome back to your{' '}
            <span className="highlight">Money Manager</span>
          </p>
        </div>

        <MoneyDetails balance={balance} income={income} expenses={expenses} />

        <div className="transaction-section">
          <form className="form" onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              value={titleInput}
              type="text"
              onChange={this.onChangeTitle}
              placeholder="TITLE"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              value={amountInput}
              type="text"
              onChange={this.onChangeAmount}
              placeholder="AMOUNT"
            />
            <label htmlFor="type">TYPE</label>
            <select id="type" value={optionId} onChange={this.onChangeType}>
              {transactionTypeOptions.map(option => (
                <option key={option.optionId} value={option.optionId}>
                  {option.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>

          <div className="history">
            <h1>History</h1>
            <ul>
              <li className="history-header">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {transactionsList.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  transaction={transaction}
                  onDelete={this.onDeleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
