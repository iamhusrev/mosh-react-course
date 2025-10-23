interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({ expenses, onDelete }: ExpenseListProps) => {
  return (
    <div className=" table-responsive table-bordered">
      <table className="table table-hover table-bordered table-striped table-sm align-middle">
        <caption>List of expenses</caption>
        <thead>
          <tr>
            <th className="text-center" scope="col">
              ID
            </th>
            <th className="text-center" scope="col">
              Description
            </th>
            <th className="text-center" scope="col">
              Amount
            </th>
            <th className="text-center" scope="col">
              Category
            </th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td className="text-center">{expense.id}</td>
              <td className="text-center">{expense.description}</td>
              <td className="text-center">{expense.amount}</td>
              <td className="text-center">{expense.category}</td>
              <td className="text-center">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => onDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>
              $
              {expenses
                .reduce((total, expense) => total + expense.amount, 0)
                .toFixed(2)}
            </td>
            <td></td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default ExpenseList;
