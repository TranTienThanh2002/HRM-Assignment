import { initEmployeeModule } from "./modules/employee/employee.module.js";
import { initLeaveModule } from "./modules/leave/leave.module.js";

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("input[required]").forEach((input) => {
    const label = input.previousElementSibling;
    if (label && label.tagName === "LABEL") {
      label.innerHTML += ' <span style="color:red">*</span>';
    }
  });
  document.querySelectorAll("select[required]").forEach((input) => {
    const label = input.previousElementSibling;
    if (label && label.tagName === "LABEL") {
      label.innerHTML += ' <span style="color:red">*</span>';
    }
  });
  initEmployeeModule();
  initLeaveModule();
});
