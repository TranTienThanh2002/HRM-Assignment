const { employees } = require("../data/store");
const { v4: uuidv4 } = require("uuid");
exports.getAllEmployees = (req, res) => {
  res.status(200).json(employees);
};

exports.createEmployee = (req, res, next) => {
  try {
    const { name, department, leaveBalance } = req.body;

    if (!name || !department || leaveBalance == null) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const generatedId = `NV-${Date.now()}`;

    const newEmployee = {
      id: generatedId,
      name,
      department,
      leaveBalance: Number(leaveBalance),
    };

    employees.push(newEmployee);

    res.status(201).json({
      message: "Employee created successfully",
      data: newEmployee,
    });
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = (req, res) => {
  const employee = employees.find(emp => emp.id === req.params.id);

  if (!employee) {
    return res.status(404).json({ message: "Employee not found" });
  }

  res.status(200).json(employee);
};

exports.deleteEmployee = (req, res) => {
  const index = employees.findIndex(emp => emp.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Employee not found" });
  }

  employees.splice(index, 1);

  res.status(200).json({ message: "Employee deleted" });
};