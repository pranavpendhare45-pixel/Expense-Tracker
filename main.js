let expenseName = document.querySelector("#expense-name");
let expenseAmount = document.querySelector("#expense-amount");
let expenseDate = document.querySelector("#date");
let addButton = document.querySelector(".add-button");
let totalAmount = document.querySelector("#total-amount");

let tableDiv = document.createElement("div");
tableDiv.style.marginTop = "20px";

let table = document.createElement("table");
table.style.width = "750px";
table.style.marginTop = "30px";
table.setAttribute("border", "1");

let row = document.createElement("tr");
row.style.height = "40px";
row.style.padding = "20px";
row.style.backgroundColor = "crimson";
row.style.color = "white";
row.innerHTML = `<th>Expense Name</th>
    <th>Expense Amount</th>
    <th>Expense Date</th>
    <th>Action</th>`;

table.appendChild(row);
tableDiv.appendChild(table);
document.querySelector(".expense-container").appendChild(tableDiv);

let totalExpense = []; 

function saveExpenses() {
  localStorage.setItem("expenses", JSON.stringify(totalExpense));
}

function loadExpenses() {
  let stored = localStorage.getItem("expenses");
  if (stored) {
    totalExpense = JSON.parse(stored);
    totalExpense.forEach(renderRow);
    updateTotal();
  }
}

function updateTotal() {
  let sum = totalExpense.reduce((s, item) => s + Number(item.amount), 0);
  totalAmount.style.display = totalExpense.length ? "block" : "none";
  totalAmount.innerText = sum;
}


function renderRow(expense) {
  let column = document.createElement("tr");
  column.dataset.amount = expense.amount;
  column.innerHTML = `
    <td style="word-break: break-word; overflow-wrap: break-word;">${expense.name}</td>
    <td>${expense.amount}</td>
    <td>${expense.date}</td>
    <td><button class="delete-button">Delete</button></td>
  `;
  column.style.textAlign = "center";
  table.appendChild(column);

  column.querySelector(".delete-button").addEventListener("click", function () {
    totalExpense = totalExpense.filter(function (item) {
      return item !== expense;
    });
    column.remove();
    updateTotal();
    saveExpenses();
  });
}

addButton.addEventListener("click", function () {
  if (
    expenseName.value == "" ||
    expenseAmount.value == "" ||
    expenseDate.value == ""
  ) {
    alert("ENTER THE EXPENSES!");
    return;
  }

  let expense = {
    name: expenseName.value,
    amount: Number(expenseAmount.value),
    date: expenseDate.value,
  };

  totalExpense.push(expense);
  renderRow(expense);
  updateTotal();
  saveExpenses();

  expenseName.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";
});

loadExpenses();