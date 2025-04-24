let subjects = [
    { grade: "", credit: "" },
    { grade: "", credit: "" },
    { grade: "", credit: "" },
  ];
  
  function renderSubjects() {
    const container = document.getElementById("subject-list");
    container.innerHTML = "";
  
    subjects.forEach((subject, index) => {
      const div = document.createElement("div");
      div.className = "flex flex-col sm:flex-row gap-4 mb-4";
  
      div.innerHTML = `
        <select
          class="w-full sm:w-1/2 border border-gray-300 rounded-lg p-3 shadow"
          onchange="handleChange(${index}, 'grade', this.value)"
        >
          <option value="">เลือกเกรด</option>
          <option value="4.0" ${subject.grade === "4.0" ? "selected" : ""}>A (4.0)</option>
          <option value="3.5" ${subject.grade === "3.5" ? "selected" : ""}>B+ (3.5)</option>
          <option value="3.0" ${subject.grade === "3.0" ? "selected" : ""}>B (3.0)</option>
          <option value="2.5" ${subject.grade === "2.5" ? "selected" : ""}>C+ (2.5)</option>
          <option value="2.0" ${subject.grade === "2.0" ? "selected" : ""}>C (2.0)</option>
          <option value="1.5" ${subject.grade === "1.5" ? "selected" : ""}>D+ (1.5)</option>
          <option value="1.0" ${subject.grade === "1.0" ? "selected" : ""}>D (1.0)</option>
          <option value="0.0" ${subject.grade === "0.0" ? "selected" : ""}>F (0.0)</option>
        </select>
  
        <input
          type="number"
          min="0"
          step="0.5"
          placeholder="หน่วยกิต"
          class="w-full sm:w-1/2 border border-gray-300 rounded-lg p-3 shadow"
          value="${subject.credit}"
          oninput="handleChange(${index}, 'credit', this.value)"
        />
      `;
  
      container.appendChild(div);
    });
  
    calcGpa();
  }
  
  function handleChange(index, field, value) {
    subjects[index][field] = value;
    calcGpa();
  }
  
  function addSubject() {
    subjects.push({ grade: "", credit: "" });
    renderSubjects();
  }
  
  function deleteSubject() {
    if (subjects.length > 1) {
      subjects.pop();
      renderSubjects();
    }
  }
  
  function calcGpa() {
    let totalGrade = 0;
    let totalCredit = 0;
  
    subjects.forEach((subject) => {
      const grade = parseFloat(subject.grade);
      const credit = parseFloat(subject.credit);
  
      if (!isNaN(grade) && !isNaN(credit)) {
        totalGrade += grade * credit;
        totalCredit += credit;
      }
    });
  
    const gpa = totalCredit > 0 ? (totalGrade / totalCredit).toFixed(2) : "0.00";
    document.getElementById("gpa-result").innerText = gpa;
  }
  
  renderSubjects();
  