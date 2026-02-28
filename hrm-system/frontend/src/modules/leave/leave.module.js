import {
  renderLeaves,
  bindLeaveForm,
  bindApproveAction,
  bindRejectAction,
  loadEmployeeOptions
} from "./leave.ui.js";

export function initLeaveModule() {
  const form = document.getElementById("leave-form");
  const tableContainer = document.getElementById("leave-table");
  const loadBtn = document.getElementById("load-leaves");

  if (!form || !tableContainer || !loadBtn) return;
  const startInput = document.getElementById("leave-startDate");
  const endInput = document.getElementById("leave-endDate");
  const today = new Date().toISOString().split("T")[0];
  startInput.min = today;
  endInput.min = today;
  bindLeaveForm(form, tableContainer);
  bindApproveAction(tableContainer);
  bindRejectAction(tableContainer);
  loadEmployeeOptions()
  renderLeaves(tableContainer);
  loadBtn.addEventListener("click", () => {
    renderLeaves(tableContainer);
  });
}