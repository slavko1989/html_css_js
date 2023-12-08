var projects = {};

function addNote() {
  var noteInput = document.getElementById("noteInput");
  var noteText = noteInput.value.trim();
  
  if (noteText === "") {
    alert("Molimo vas unesite tekst beleške");
    return;
  }

  var selectProject = document.getElementById("projectSelect").value;

  if (!projects[selectProject]) {
    projects[selectProject] = [];
  }
  
  projects[selectProject].push({ text: noteText, completed: false });

  renderNotes(selectProject);
  noteInput.value = "";

  // Sačuvaj projekte u Local Storage
  saveProjects();
}

function onProjectChange() {
  var selectProject = document.getElementById("projectSelect").value;
  renderNotes(selectProject);
}

function renderNotes(project) {
  var noteList = document.getElementById("noteList");
  noteList.innerHTML = "";

  if (projects[project]) {
    projects[project].forEach(function (note, index) {
      var newNote = document.createElement("li");
      var checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      checkBox.checked = note.completed;
      checkBox.addEventListener("click", function () {
        projects[project][index].completed = checkBox.checked;
        saveProjects();
        renderNotes(project);
      });

      var noteTextNode = document.createTextNode(note.text);
      newNote.appendChild(checkBox);
      newNote.appendChild(noteTextNode);
      noteList.appendChild(newNote);

      if (note.completed) {
        newNote.style.textDecoration = "line-through";
      }
    });
  }
}

function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function getSavedProjects() {
  var savedProjects = localStorage.getItem('projects');
  if (savedProjects) {
    return JSON.parse(savedProjects);
  } else {
    return {};
  }
}

// Učitavanje projekata prilikom pokretanja stranice
window.onload = function() {
  projects = getSavedProjects();
  var selectProject = document.getElementById("projectSelect").value;
  renderNotes(selectProject);
};
