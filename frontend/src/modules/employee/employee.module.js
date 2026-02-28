import { renderEmployees, bindEmployeeForm } from "./employee.ui.js";

export function initEmployeeModule() {
  const form = document.getElementById("employee-form");
  const table = document.getElementById("employee-table");
  const loadBtn = document.getElementById("load-employees");
  bindEmployeeForm(form, table);
  renderEmployees(table)
  loadBtn.addEventListener("click", () => renderEmployees(table));
}