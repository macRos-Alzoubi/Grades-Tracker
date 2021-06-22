'use strict';

const loadFromLocalStorage = function(){
  const studentList = JSON.parse(localStorage.getItem('studentGrades')) || [];

  for(let i = 0; i < studentList.length; i++ ){
    new Student(studentList[i].studentName, studentList[i].studentCourse);
  }
};

const addToLocalStorage = function(){
  localStorage.setItem('studentGrades', JSON.stringify(Student.studentList));
};



const generateGrade = function(){
  return Math.floor(Math.random() * 101);
};

const getStatus = function(grade){
  return grade >= 50 ? 'PASS' : 'FALL';
};


const Student = function(studentName, studentCourse){
  this.studentName = studentName;
  this.studentCourse = studentCourse;
  this.grade = generateGrade();
  this.status = getStatus(this.grade);

  Student.studentList.push(this);
};


Student.prototype.render = function(){

  const studentTabel = document.querySelector('.tabel');
  const tabelRow = document.createElement('tr');

  for(let i = 0; i < 4; i++){
    const rowDataCell = document.createElement('td');
    if(i === 0)
      rowDataCell.textContent = this.studentName;
    else if(i === 1)
      rowDataCell.textContent = this.studentCourse;
    else if(i === 2)
      rowDataCell.textContent = this.grade;
    else
      rowDataCell.textContent = this.status;

    tabelRow.appendChild(rowDataCell);
  }
  studentTabel.appendChild(tabelRow);
};

Student.studentList = [];


const formSubmitHandler = function(e){
  e.preventDefault();

  console.log('in handler');
  const studentName = e.target.studentName.value;
  const studentCourse = e.target.studentCourse.value;
  const newStudent = new Student(studentName, studentCourse);
  addToLocalStorage();
  newStudent.render();

  e.reset();
};

document.querySelector('.form').addEventListener('submit', formSubmitHandler);

const clearTabel = function(){
  document.querySelector('.tabel').innerHTML = '';
};

const renderTabelHeader = function(){
  const studentTabel = document.querySelector('.tabel');
  const tabelRow = document.createElement('tr');
  for(let i =0; i < 4; i++){
    const tableHeadCell = document.createElement('th');
    if(i === 0)
      tableHeadCell.textContent = 'Student Name';
    else if(i === 1)
      tableHeadCell.textContent = 'Student Course';
    else if(i === 2)
      tableHeadCell.textContent = 'Grade';
    else
      tableHeadCell.textContent = 'Status';

    tabelRow.appendChild(tableHeadCell);
  }
  studentTabel.appendChild(tabelRow);
};

const renderStudentsTable = function(){
  loadFromLocalStorage();
  clearTabel();
  renderTabelHeader();
  for(let i = 0; i < Student.studentList.length; i++){
    Student.studentList[i].render();

  }
};

renderStudentsTable();
