let list = document.getElementById('todos-list');
let addBtn = document.getElementById('todo-add-btn');
let addInput = document.getElementById('todo-input');

function createTodo() {
  let text = addInput.value;

  if (text === '') {
    return;
  }

  let li = document.createElement('li');
  let checkbox = document.createElement('input');
  checkbox.classList.add('checkbox');
  checkbox.type = 'checkbox';

  let paragraph = document.createElement('p');
  paragraph.classList.add('paragraph');
  paragraph.textContent = text;

  let remove = document.createElement('span');
  remove.classList.add('remove');
  remove.innerHTML = '&cross;';

  remove.addEventListener('click', () => {
    remove.parentElement.remove()
  });

  li.append(checkbox);
  li.append(paragraph);
  li.append(remove);
  list.append(li);

  addInput.value = '';
}

function showEditInput(paragraphElement) {
  let editInput = document.getElementsByName('editInput')[0];
  if (editInput) {
    editInput.remove();
  }

  let input = document.createElement('input');
  input.type = 'text';
  input.name = 'editInput';
  input.value = paragraphElement.textContent;
  input.classList.add('editInput');

  paragraphElement.parentElement.append(input);
  input.focus();
}

function updateTodo() {
  let editInput = document.getElementsByName('editInput')[0];
  if (!editInput) {
    return;
  }
  let newText = editInput.value;
  if (newText !== '') {
    let paragraph = editInput.parentElement.querySelector('paragraph');
    paragraph.textContent = newText;
  }
  editInput.remove();
}


function toggleComplete(inputElement) {
  if (inputElement.checked === false) {
    inputElement.parentElement.classList.remove('complete');
  } else {
    inputElement.parentElement.classList.add('complete');
  }
}

list.addEventListener('click', function (event) {
  event.stopPropagation();

  switch (event.target.tagName) {
    case 'P':
      showEditInput();
      break;
  }
});

list.addEventListener('change', function (event) {
  if (event.target.tagName === 'INPUT' && event.target.type === 'checkbox') {
    toggleComplete();
  }
});

list.addEventListener('keypress', function (event) {
  if (event.target.tagName === 'INPUT' && event.target.type === 'text' && event.key === 'Enter') {
    updateTodo();
  }
});

document.addEventListener('click', function (event) {
  event.stopPropagation();
  createTodo();
});

addBtn.addEventListener('click', createTodo);

addInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    createTodo();
  }
});
