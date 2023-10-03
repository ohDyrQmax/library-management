import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee from "../models/Employee.js";

/* employee authen */

//register
export const employeeRegister = async (req, res) => {
  try {
    let { username, password } = req.body || req;

    let salt = await bcrypt.genSalt();
    let passwordHash = await bcrypt.hash(password, salt);

    let newBorrower = new Employee({
      username,
      password: passwordHash,
    });

    let savedUser = await newBorrower.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || error });
  }
};

//login
export const employeeLogin = async (req, res) => {
  try {
    let { username, password } = req.body || req;
    let employee = await Employee.findOne({ username: username });
    if (!employee)
      return res.status(400).json({ message: "Username not found." });

    let isMatchPassword = await bcrypt.compare(password, employee.password);
    if (!isMatchPassword)
      return res.status(400).json({ message: "Wrong password." });

    let token = jwt.sign({ id: employee.__id }, process.env.JWT_SECRET);
    delete employee.password;
    res.status(200).json({ employee, token });
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message || error });
  }
};
