import { leaveAPI } from "./leave.api.js";
import { employeeAPI } from "../employee/employee.api.js";
import { showMessage } from "../../core/ui.js";
import {renderEmployees} from "../employee/employee.ui.js"
/* =========================
   RENDER TABLE
========================= */

export async function renderLeaves(container) {
  try {
    const data = await leaveAPI.getAll();

    if (!data.length) {
      container.innerHTML = "<p>No leave requests found.</p>";
      return;
    }

    container.innerHTML = `
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Start</th>
            <th>End</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(l => `
            <tr>
              <td>${l.id}</td>
              <td>${l.employeeId}</td>
              <td>${l.startDate}</td>
              <td>${l.endDate}</td>
              <td>${l.reason}</td>
              <td class="${l.status === "Approved" ? "approved" : l.status === "Rejected" ? "rejected" : "pending"}">
                ${l.status}
              </td>
              <td>
                ${
                  l.status === 'Pending'
                    ? `<button class="approve-btn" data-id="${l.id}">
                        Approve
                       </button>
                       <button class="reject-btn" data-id="${l.id}">
                        Reject
                       </button>`
                    : "-"
                }
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    `;

  } catch (err) {
    console.error(err);
  }
}

/* =========================
   BIND FORM
========================= */

export function bindLeaveForm(form, tableContainer) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const employeeId = form.querySelector("#leave-employeeId").value.trim();
    const startDate = form.querySelector("#leave-startDate").value;
    const endDate = form.querySelector("#leave-endDate").value;
    const reason = form.querySelector("#leave-reason").value.trim();
    // Validation
    if (!employeeId || !startDate || !endDate || !reason) {
      showMessage("Please fill all fields", "error");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      showMessage("End date must be after start date", "error");
      return;
    }

    try {
      await leaveAPI.create({
        employeeId,
        startDate,
        endDate,
        reason
      });

      showMessage("Leave request created");
      form.reset();
      renderLeaves(tableContainer);
      renderEmployeesFunc()
    } catch (err) {
      console.error(err);
    }
  });
}

/* =========================
   BIND APPROVE BUTTON
========================= */

export function bindApproveAction(container) {
  container.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("approve-btn")) return;

    const id = e.target.dataset.id;
    try {
      await leaveAPI.approve(id);
      showMessage("Leave approved");
      renderLeaves(container);
      renderEmployeesFunc()
    } catch (err) {
      console.error(err);
    }
  });
}

/* =========================
   BIND REJECT BUTTON
========================= */

export function bindRejectAction(container) {
  container.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("reject-btn")) return;

    const id = e.target.dataset.id;
    try {
      await leaveAPI.reject(id);
      showMessage("Leave rejected");
      renderLeaves(container);
      renderEmployeesFunc()
    } catch (err) {
      console.error(err);
    }
  });
}
export async function loadEmployeeOptions() {
  try {
    const employees = await employeeAPI.getAll();

    const select = document.getElementById("leave-employeeId");

    // Clear old options
    select.innerHTML = '<option value="">-- Select Employee --</option>';

    employees.forEach(emp => {
      const option = document.createElement("option");
      option.value = emp.id;
      option.textContent = `${emp.id}`;
      select.appendChild(option);
    });

  } catch (err) {
    console.error("Failed to load employees", err);
  }
}
function renderEmployeesFunc() {
   const table = document.getElementById("employee-table");
   renderEmployees(table);
}