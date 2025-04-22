import './index.css'

const TransactionItem = ({transaction, onDelete}) => {
  const {id, title, amount, type} = transaction

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <li className="transaction-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <button type="button" onClick={handleDelete} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
