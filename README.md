# Simple HRM System

## 1️⃣ Run Backend

cd backend
npm install
npm start

Server runs at:
http://localhost:3000

---

## 2️⃣ Run Frontend

cd frontend
npm install
npm run dev

---

## 3️⃣ Example API Usage

GET all employees:
GET http://localhost:3000/employees

Create employee:
POST http://localhost:3000/employees
{
  "name": "John",
  "department": "IT",
  "leaveBalance": 5
}

Create leave:
POST http://localhost:3000/leave
{
  "employeeId": "NV-1772372879329",
  "startDate": "2026-03-02",
  "endDate": "2026-03-05",
  "reason": "I'm sick"
}