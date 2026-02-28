import { employeeAPI } from "./employee.api.js";
import { showMessage } from "../../core/ui.js";
import { loadEmployeeOptions } from "../leave/leave.ui.js";
export function renderEmployees(container) {
  employeeAPI.getAll().then((data) => {
    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Department</th><th>Balance</th>
          </tr>
        </thead>
        ${data
          .map(
            (emp) => `
          <tr>
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.department}</td>
            <td>${emp.leaveBalance}</td>
          </tr>
        `,
          )
          .join("")}
      </table>
    `;
  });
}

export function bindEmployeeForm(form, tableContainer) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = form.querySelector("#emp-name").value.trim();
    const dept = form.querySelector("#emp-dept").value.trim();
    const balance = Number(form.querySelector("#emp-balance").value);

    if (!name || !dept || balance < 0) {
      showMessage("Invalid employee data", "error");
      return;
    }

    await employeeAPI.create({ name, department: dept, leaveBalance: balance });

    showMessage("Employee created");
    form.reset();
    renderEmployees(tableContainer);
    loadEmployeeOptions();
  });
}
