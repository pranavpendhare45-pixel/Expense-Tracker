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

addButton.addEventListener("click", function () {
  if (
    expenseName.value == "" ||
    expenseAmount.value == "" ||
    expenseDate.value == ""
  ) {
    alert("ENTER THE EXPENSES!");
    return;
  }

  totalExpense.push(Number(expenseAmount.value));

  let column = document.createElement("tr");
  column.dataset.amount = expenseAmount.value;
  column.innerHTML = `
    <td style="word-break: break-word; overflow-wrap: break-word;">${expenseName.value}</td>
    <td>${expenseAmount.value}</td>
    <td>${expenseDate.value}</td>
    <td><button class="delete-button">Delete</button></td>
  `;
  column.style.textAlign = "center";
  table.appendChild(column);

  expenseName.value = "";
  expenseAmount.value = "";
  expenseDate.value = "";

  totalAmount.style.display = "block";
  totalAmount.innerText = totalExpense.reduce((sum, val) => sum + val, 0);
});

table.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-button")) {
    let row = e.target.parentElement.parentElement;
    let amount = Number(row.dataset.amount);

    let index = totalExpense.indexOf(amount);
    if (index !== -1) totalExpense.splice(index, 1);

    row.remove();

    totalAmount.innerText = totalExpense.reduce((sum, val) => sum + val, 0);
  }
});
