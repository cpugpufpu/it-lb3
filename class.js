class People {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Student extends People {
    constructor(name, age, university) {
        super(name, age);

        this.university = university;
    }
}

const person = new People('Alex', 19);
const student = new Student('Alex', 19, 'NURE');

console.log(person);
console.log(student);
