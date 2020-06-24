function Student(name, email) {
    const this$ = {};
    let homeworkResult = [];

    class Student {
        constructor(name, email) {
            this$.name = name;
            this$.email = email;
        }
        getName() {
            return this$.name;
        }
        getEmail() {
            return this$.email;
        }
        addHomeworkResult(topic, success) {
            homeworkResult.push({ topic: topic, success: success });
        }
        getHomeworkResult() {
            return homeworkResult;
        }

    }
    return new Student(name, email);
}

function FrontendLab(studentsList, failedHomeworksLimit) {
    const this$ = {};

    class FrontendLab {
        constructor(students, failedHomeworksLimit) {
            this$.failedHomeworksLimit = failedHomeworksLimit;
            this$.studentsList = studentsList.map((student) => new Student(student.name, student.email));
        }
        printStudentsList() {
            this$.studentsList.forEach((student) => {
                console.log(`name: ${ student.getName()}, email: ${student.getEmail()}`);
                console.log(student.getHomeworkResult());
            });
        }
        addHomeworkResults(homeworkResults) {
            this$.studentsList.forEach((student) => {
                let topic, success;

                topic = homeworkResults.topic;
                homeworkResults.results.forEach((el) => {
                    if (student.getEmail() === el.email) {
                        success = el.success;
                    }
                });

                student.addHomeworkResult(topic, success);
            });
        }
        printStudentsEligibleForTest() {
            this$.studentsList.forEach((student) => {
                let falseAmount = 0;
                student.getHomeworkResult().forEach((el) => {
                    if (el.success === false) {
                        falseAmount++;
                    }
                });
                if (falseAmount <= this$.failedHomeworksLimit) {
                    console.log(`name: ${ student.getName()}, email: ${student.getEmail()}`);
                }
            });
        }

    }
    return new FrontendLab(studentsList, failedHomeworksLimit);
}