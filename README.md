# ToDoFancy

### Table routes Authentication

Route | HTTP | Description
---|---|---
signin FB | localhost:3000/signin/facebook | signin with FB
signin (manual) | localhost:3000/signin | signin from ToDO fancy
signup (register) | localhost:3000/signup | register new User

### Table routes User

Route | HTTP | Description
---|---|---
get users | localhost:3000/users | get all users

### Table routes ToDO

Route | HTTP | Description
---|---|---
create ToDO (POST) | localhost:3000/users/todo/create | add new ToDO
get ToDO | localhost:3000/users/todo | get all todo
send email (POST) | localhost:3000/users/todo/sendEmail | reminder if planning Date same with current date
get One ToDO | localhost:3000/users/todo/:id | this find ToDO for edit dinamic if form one of not fill
mark Completed ToDO(GET) | localhost:3000/users/todo/completed/:status |this for grouping display ToDO
Mark ToDO(POST) | localhost:3000/users/todo/markComplete | mark completed toDO
edit ToDO(PUT) | localhost:3000/users/todo/edit/:id | edit toDO
delete ToDO(DELETE) | localhost:3000/users/todo/delete/:id | deleted toDO
