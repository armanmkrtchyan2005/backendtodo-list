const form = document.querySelector("form");
const titleInp = document.querySelector("#titleInp");
const todo = document.querySelector("#todo");
const saveBtn = document.createElement('button');
const url = "http://localhost:8080/todo";

getTodo();

async function getTodo() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    todo.innerHTML = "";
    if (data.length) {
      data.forEach((item) => {
        const li = document.createElement("li");
        const btnGroup = document.createElement('div')
        const delBtn = document.createElement("button");
        const successBtn = document.createElement('button')
        todo.append(li);
        li.prepend(item.title);
        li.append(btnGroup);
        btnGroup.append(delBtn)
        btnGroup.append(successBtn)

        if (item.completed) {
          li.classList.add('completed')
          successBtn.setAttribute('disabled', true)
        }
        

        li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')

        delBtn.classList.add('btn', 'btn-danger')
        successBtn.classList.add('btn', 'btn-success')

        delBtn.innerHTML = "Delete";
        successBtn.innerHTML = "Success";

        delBtn.addEventListener("click", () => {
          deleteRequest(url, item._id)
        });


        successBtn.addEventListener('click', () => {
          successRequest(url, item._id)
        })

      });
    }
  } catch (e) {
    console.log(e.message);
  }
}

function deleteRequest(url, id) {
  fetch(`${url}/delete/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((delRes) => delRes.json())
    .then((data) => {
      getTodo();
      console.log(data);
    })
    .catch((err) => console.log(err.message));
}

function successRequest(url, id) {
  fetch(`${url}/success/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
  }).then(res => res.json())
    .then(data => {
      console.log(data);
      getTodo()
    })
    .catch(err => console.error(err))
}


form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (titleInp.value.trim()) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleInp.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        todo.innerHTML = "";
        getTodo();

        console.log(data);
      })
      .catch((e) => console.log(e.message));
    titleInp.value = "";
  }
});
