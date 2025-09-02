const STORAGE_KEY = "basic-todos-v1";
let todos = [];

const $ = (sel, root=document) => root.querySelector(sel);

const list = $("#list");
const empty = $("#empty");
const count = $("#count");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}
function load() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) todos = JSON.parse(data);
}
function render() {
  list.innerHTML = "";
  if (todos.length === 0) {
    empty.hidden = false;
  } else {
    empty.hidden = true;
    todos.forEach((t, i) => {
      const li = document.createElement("li");
      li.className = t.done ? "done" : "";

      const span = document.createElement("span");
      span.textContent = t.text;
      span.style.cursor = "pointer";
      span.addEventListener("click", () => toggle(i));

      const del = document.createElement("button");
      del.textContent = "❌";
      del.style.border = "none";
      del.style.background = "transparent";
      del.style.cursor = "pointer";
      del.addEventListener("click", () => remove(i));

      li.append(span, del);
      list.appendChild(li);
    });
  }
  count.textContent = `${todos.length} item${todos.length !== 1 ? "s" : ""}`;
  save();
}

function add(text) {
  text = text.trim();
  if (!text) return;
  todos.push({ text, done: false });
  render();
}

function toggle(index) {
  todos[index].done = !todos[index].done;
  render();
}

function remove(index) {
  todos.splice(index, 1);
  render();
}

$("#add-form").addEventListener("submit", (e) => {
  e.preventDefault();
  add($("#new-todo").value);
  $("#new-todo").value = "";
});

load();
render();
