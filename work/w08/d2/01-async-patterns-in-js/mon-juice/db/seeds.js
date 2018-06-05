// First we must require our database
require('./../config/database');

// Import our Mongoose models
const Teacher = require('./../models/Teacher');
const Student = require('./../models/Student');

// Destroy all data in database
const seed = Promise.all([Teacher.remove({}), Student.remove({})])

// Let's create 4 students 
seed.then(() => {
    return Student.create([
        { name: 'Jim', age: 45, grade: 'A' },
        { name: 'Hector', age: 23, grade: 'B-' },
        { name: 'Eduardo', age: 47, grade: 'C' },
        { name: 'Reba', age: 27, grade: 'B+' },
    ])
})

// Let's log out all students and add add 2 teachers
.then((students) => {
    console.log(students);
    return Teacher.create([
        { name: "Jay", age: 34, class: 'UXDI', students: [ students[0]._id, students[1]._id ] },
        { name: "Jon", age: 7, class: 'WDI', students: [ students[2]._id, students[3]._id ] },
    ])
})

// Let's log out teachers and close the connection to our Mongoose database
.then((teachers) => {
    console.log(teachers);
    require('mongoose').connection.close();
    process.exit();
})