import './index.css'

const MoneyDetails = ({balance, income, expenses}) => (
  <div className="money-details-container">
    <div className="card balance" data-testid="balanceAmount">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
        alt="balance"
      />
      <p>Your Balance</p>
      <p data-testid="balanceAmount">Rs {balance}</p>
    </div>
    <div className="card income" data-testid="incomeAmount">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
        alt="income"
      />
      <p>Your Income</p>
      <p data-testid="incomeAmount">Rs {income}</p>
    </div>
    <div className="card expenses" data-testid="expensesAmount">
      <img
        src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
        alt="expenses"
      />
      <p>Your Expenses</p>
      <p data-testid="expensesAmount">Rs {expenses}</p>
    </div>
  </div>
)

export default MoneyDetails
