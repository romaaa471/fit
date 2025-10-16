function getClients() {
  return JSON.parse(localStorage.getItem("clients") || "[]");
}

function saveClients(clients) {
  localStorage.setItem("clients", JSON.stringify(clients));
}

function renderClients() {
  const table = document.getElementById("clientTableBody");
  if (!table) return;

  const clients = getClients();
  table.innerHTML = "";

  clients.forEach((c, i) => {
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
      </td>
    `;
    table.appendChild(row);
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
  const clients = getClients();
  const client = {
    fullName: document.getElementById("fullName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    fitnessGoal: document.getElementById("fitnessGoal").value,
    startDate: document.getElementById("startDate").value
  };
  const index = document.getElementById("editIndex").value;
  if (index) clients[index] = client;
  else clients.push(client);
  saveClients(clients);
  closeModal();
  renderClients();
}

function deleteClient(i) {
  const clients = getClients();
  if (confirm("Delete this client?")) {
    clients.splice(i, 1);
    saveClients(clients);
    renderClients();
  }
}

function editClient(i) {
  const clients = getClients();
  const c = clients[i];
  openModal();
  document.getElementById("fullName").value = c.fullName;
  document.getElementById("email").value = c.email;
  document.getElementById("phone").value = c.phone;
  document.getElementById("fitnessGoal").value = c.fitnessGoal;
  document.getElementById("startDate").value = c.startDate;
  document.getElementById("editIndex").value = i;
}

function searchClients() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const rows = document.querySelectorAll("#clientTableBody tr");
  rows.forEach(row => {
    row.style.display = row.innerText.toLowerCase().includes(query) ? "" : "none";
  });
}

function updateStats() {
  const clients = getClients();
  document.getElementById("totalClients").textContent = clients.length;
  document.getElementById("weightCount").textContent = clients.filter(c => c.fitnessGoal === "Weight Loss").length;
  document.getElementById("muscleCount").textContent = clients.filter(c => c.fitnessGoal === "Muscle Gain").length;
  document.getElementById("newThisMonth").textContent = clients.filter(c => {
    return new Date(c.startDate).getMonth() === new Date().getMonth();
  }).length;
}

window.onload = function() {
  renderClients();
  updateStats();
};
