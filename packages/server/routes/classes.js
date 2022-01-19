import express from "express";
import { Class, Assignment, User } from "../models/index.js";

const router = express.Router();

router
  .get("/", async (req, res) => {
    const classes = await Class.find();
    classes.length === 0 && res.send("please add assignments!");
    res.send(classes);
  })
  .get("/:id", async (req, res) => {
    const classData = await Class.findOne({ _id: req.params.id });

    res.send(classData);
  })
  .post("/", async (req, res) => {
    try {
      const newClass = await new Class(req.body);
      newClass.save();

      res.json(newClass);
    } catch (err) {
      res.status(500).send("Error creating new class.");
    }
  })
  .patch("/", async (req, res) => {
    if (req.body.studentName) {
      try {
        const cls = await Class.findOne({ name: req.body.clsName });
        if (!cls) throw new Error("Class not found.");

        const student = await User.findOne({ username: req.body.studentName });
        if (!student) throw new Error("User not found.");

        if (!cls.students.includes(student._id)) {
          cls.students.push(student);
          cls.save();
          student.classIds.push(cls);
          student.save();
        } else {
          throw new Error("Student is already in the class.");
        }

        res.send(cls);
      } catch (err) {
        console.log(err);
        res.send(err);
      }
    } else {
      try {
        const cls = await Class.findOne({ name: req.body.name });
        if (!cls) throw new Error("Class not found.");

        const assignm = await Assignment.findOne({ name: req.body.assignment });
        if (!assignm) throw new Error("Assignment not found.");

        cls.assignments.push(assignm);
        cls.save();

        res.send(cls);
      } catch (err) {
        res.status(404).send("Class not found");
      }
    }
  });

export default router;
