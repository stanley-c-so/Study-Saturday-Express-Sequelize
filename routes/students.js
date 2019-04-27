const router = require('express').Router();

const Student = require('../db/models/student.js');

router.get("/", async (req, res, next) => {
    try {
        const students = await Student.findAll();
        res.send(students);
    } catch (error) { next(error) }
});

router.get("/:id", async (req, res, next) => {
    try {
        const student = await Student.findByPk(req.params.id);
        student === null ? res.sendStatus(404) : res.send(student);
    } catch (error) {next(error)}
});

router.post("/", async (req, res, next) => {
    try {
        const newStudent = await Student.create(req.body);
        res.status(201).send(newStudent);
    } catch (error) { next(error) }
});

router.put("/:id", async (req, res, next) => {
    try {
        const [numOfStudents, updatedStudent] = await Student.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
            plain: true
        });
        res.send(updatedStudent);
    } catch (error) { next(error) }
});

router.delete("/:id", async (req, res, next) => {
    try {
        await Student.destroy({
            where: {
                id: req.params.id
            }
        })
        res.sendStatus(204);
    } catch (error) { next(error) }
});

module.exports = router;
