function getClients() {
  return JSON.parse(localStorage.getItem("clients") || "[]");
}
function saveClients(list) {
  localStorage.setItem("clients", JSON.stringify(list));
}

function renderClients() {
  const tbody = document.getElementById("clientTableBody");
  if (!tbody) return;
  const list = getClients();
  tbody.innerHTML = "";
  list.forEach((c, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.fullName}</td>
      <td>${c.email}</td>
      <td>${c.phone}</td>
      <td>${c.fitnessGoal}</td>
      <td>${c.startDate}</td>
      <td>
        <button onclick="editClient(${i})">✏️</button>
        <button onclick="deleteClient(${i})">🗑️</button>
      </td>`;
    tbody.appendChild(row);
  });
}

function openModal() {
  document.getElementById("clientModal").style.display = "flex";
  document.getElementById("clientForm").reset();
  document.getElementById("editIndex").value = "";
}
function closeModal() {
  document.getElementById("clientModal").style.display = "none";
}

function saveClient(e) {
  e.preventDefault();
  const list = getClients();
  const c = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    fitnessGoal: fitnessGoal.value,
    startDate: startDate.value
  };
  const index = editIndex.value;
  if (index) list[index] = c;
  else list.push(c);
  saveClients(list);
  closeModal();
  renderClients();
}

function deleteClient(i) {
  const list = getClients();
  if (confirm("Delete this client?")) {
    list.splice(i, 1);
    saveClients(list);
    renderClients();
  }
}

function editClient(i) {
  const list = getClients();
  const c = list[i];
  openModal();
  fullName.value = c.fullName;
  email.value = c.email;
  phone.value = c.phone;
  fitnessGoal.value = c.fitnessGoal;
  startDate.value = c.startDate;
  editIndex.value = i;
}

function searchClients() {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll("#clientTableBody tr").forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(query) ? "" : "none";
  });
}

function updateStats() {
  const list = getClients();
  const weight = list.filter(c => c.fitnessGoal === "Weight Loss").length;
  const muscle = list.filter(c => c.fitnessGoal === "Muscle Gain").length;
  const month = new Date().getMonth();
  const newMonth = list.filter(c => new Date(c.startDate).getMonth() === month).length;
  if (document.getElementById("totalClients"))
    document.getElementById("totalClients").textContent = list.length;
  if (document.getElementById("weightCount"))
    document.getElementById("weightCount").textContent = weight;
  if (document.getElementById("muscleCount"))
    document.getElementById("muscleCount").textContent = muscle;
  if (document.getElementById("newThisMonth"))
    document.getElementById("newThisMonth").textContent = newMonth;
}

window.onload = () => {
  renderClients();
  updateStats();
};
