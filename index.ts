import inquirer from "inquirer";
import chalk from "chalk";

class Student {
  static counter = 10000;
  id: number;
  name: string;
  courses: string[];
  balance: number;
  constructor(name: string) {
    this.id = Student.counter++;
    this.name = name; // Corrected
    this.courses = []; // Empty array for courses
    this.balance = 5000;
  }
  
  // Method to enroll student in a course
  enroll_course(course: string) {
    this.courses.push(course);
  }
  
  // Method to view a student's Balance
  view_balance() {
    console.log(`Balance for ${this.name}: ${this.balance}`);
  }
  
  // Method to pay Fees
  pay_fees(amount: number) {
    this.balance -= amount;
    console.log(`${amount} Fees paid successfully for ${this.name}.`); // Corrected
  }
  
  // Method to display Student's status
  show_status() {
    console.log(`Student's ID: ${this.id}`);
    console.log(`Student's Name: ${this.name}`);
    console.log(`Student's Courses: ${this.courses}`);
    console.log(`Student's Balance: ${this.balance}`);
  }
}

// Class student manager to manage students
class Student_manager {
  student: Student[];

  constructor() {
    this.student = [];
  }

  // Method to add a new student
  add_student(name: string) {
    let newStudent = new Student(name);
    this.student.push(newStudent);
    console.log(`${name} added successfully. Student id is: ${newStudent.id}`);
  }

  // Method to enroll student in a course
  enroll_course(student_id: number, course: string) {
    let student = this.student.find((std) => std.id === student_id);
    if (student) {
      student.enroll_course(course);
      console.log(`${student.name} is successfully enrolled in ${course}`);
    }
  }

  // Method to view students balance
  view_student_balance(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.view_balance();
    } else {
      console.log("Student not found, Please enter correct Student Id.");
    }
  }

  // Method to pay student fee
  pay_student_fees(student_id: number, amount: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.pay_fees(amount);
      console.log(`Fees paid successfully for ${student.name}, ID: ${student.id}`);
    } else {
      console.log("Student not found, Please enter correct Student Id.");
    }
  }

  // Method to display student's status
  show_student_status(student_id: number) {
    let student = this.find_student(student_id);
    if (student) {
      student.show_status();
    }
  }

  // Method to find a student by student id
  find_student(student_id: number) {
    return this.student.find((std) => std.id === student_id);
  }
}

// Function to run program
async function main() {
  console.log(".....Welcome to Nimra's Student Management System.....");
  console.log("-".repeat(50)); // Print - 50 times

  let student_manager = new Student_manager();
  
  // While loop
  while (true) {
    // Asking user to select an option
    let choice = await inquirer.prompt([
      {
        message: "* Choose an option:",
        name: "tasks", // Corrected
        type: "list",
        choices: [
          "Add a Student",
          "Enroll a Student",
          "View Student's Balance",
          "Pay Student's Fee",
          "Show Student's Status",
          "Exit",
        ],
      },
    ]);

    switch (choice.tasks) { // Corrected
      case "Add a Student":
        let name_input = await inquirer.prompt([
          {
            name: "name",
            type: "input",
            message: "Enter Student's Name: ",
          },
        ]);
        student_manager.add_student(name_input.name);
        break;

      case "Enroll a Student":
        let course_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter a Student ID",
          },
          {
            name: "course",
            type: "input",
            message: "Enter a Course Name",
          },
        ]);
        student_manager.enroll_course(
          course_input.student_id,
          course_input.course
        );
        break;

      case "View Student's Balance":
        let balance_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter Student's ID: "
          }
        ]);
        student_manager.view_student_balance(balance_input.student_id);
        break;

      case "Pay Student's Fee":
        let fees_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter Student's ID: "
          },
          {
            name: "amount",
            type: "number",
            message: "Enter the amount to pay"
          }
        ]);
        student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
        break;

      case "Show Student's Status":
        let status_input = await inquirer.prompt([
          {
            name: "student_id",
            type: "number",
            message: "Enter Student's ID: " // Corrected
          }
        ]);
        student_manager.show_student_status(status_input.student_id);
        break;

      case "Exit":
        console.log("See You again!.....");
        process.exit();
    }
  }
}
// Calling main function to run program
main();
