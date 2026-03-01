const { leaveRequests, employees } = require("../data/store");

exports.createLeave = (req, res) => {
  const { employeeId, startDate, endDate, reason } = req.body;

  // Validate required fields
  if (!employeeId || !startDate || !endDate || !reason) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Check employee exists
  const employee = employees.find(emp => emp.id === employeeId);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  // Convert dates
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  if (end < start) {
    return res.status(400).json({
      message: "End date must be after start date"
    });
  }

  // Calculate leave days (inclusive)
  const diffTime = end.getTime() - start.getTime();
  const leaveDays =
    Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

  // Check overlap with APPROVED leaves only
  const hasOverlap = leaveRequests.some(l => {
    if (l.employeeId !== employeeId) return false;

    const existingStart = new Date(l.startDate);
    const existingEnd = new Date(l.endDate);

    return start <= existingEnd && end >= existingStart;
  });

  if (hasOverlap) {
    return res.status(400).json({
      message: "The leave period overlaps with another leave request"
    });
  }

  // Check leave balance (only check, do NOT deduct yet)
  if (employee.leaveBalance < leaveDays) {
    return res.status(400).json({
      message: `Not enough leave balance. Required: ${leaveDays}, Available: ${employee.leaveBalance}`
    });
  }
  // Deduct leave balance
  employee.leaveBalance -= leaveDays;
  // Create leave request (Pending)
  const newLeave = {
    id: `LR-${Date.now()}`,
    employeeId,
    startDate,
    endDate,
    totalDays: leaveDays,
    reason,
    status: "Pending"
  };

  leaveRequests.push(newLeave);

  res.status(201).json(newLeave);
};
exports.getAllLeaves = (req, res) => {
  res.status(200).json(leaveRequests);
};

exports.approveLeave = (req, res) => {
  const leave = leaveRequests.find(l => l.id === req.params.id);

  if (!leave) {
    return res.status(404).json({ message: "Leave request not found" });
  }

  if (leave.status === "Approved" && leave.approved) {
    return res.status(400).json({ message: "Already approved" });
  }

  leave.status = "Approved";

  res.status(200).json({
    message: "Leave request approved",
    leave
  });
};
exports.rejectLeave = (req, res) => {
  const leave = leaveRequests.find(l => l.id === req.params.id);

  if (!leave) {
    return res.status(404).json({ message: "Leave request not found" });
  }

  if (leave.status === "Rejected") {
    return res.status(400).json({ message: "Already rejected" });
  }

  if (leave.status === "Approved") {
    return res.status(400).json({ 
      message: "Cannot reject an approved leave request" 
    });
  }

  // Find employee
  const employee = employees.find(emp => emp.id === leave.employeeId);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  // Refund leave balance
  employee.leaveBalance += leave.totalDays;

  leave.status = "Rejected";

  res.status(200).json({
    message: "Leave request rejected",
    leave
  });
};