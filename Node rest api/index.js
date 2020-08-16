const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();

app.use(cors())

const mysql = require('mysql');
const { response, request } = require('express');

// parse application/json
app.use(bodyParser.json());

//Create Database Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs_todo_restapi',
});

// listen the app
app.listen(8000, () => {
  console.log('server started on port 8000...');
});

app.get('/', (request, response) => {
  response.send(
    JSON.stringify({ status: 200, error: '', response: 'Hello Word..' })
  );
});

// create or insert new todo

app.post('/api/createTodo', (request, response) => {
  let data = {
    title: request.body.title,
  };

  let sqlstmt = `insert into todos set ?`;
  connection.query(sqlstmt, data, (err, result) => {
    if (err) throw err;

    let fetchq = "select * from todos where id="+result.insertId;
    connection.query(fetchq, (err, result) => {
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: result,
      })
    );
  });

  });
});

// complete the todo
app.post('/api/completeTodo', (request, response) => {
  let sqlstmt =
    "update todos set completed='" +
    request.body.completed +
    "'  where id = " +
    request.body.id;

  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: 'One Todo editing',
      })
    );
  });
  console.log(sqlstmt.sql);
});


// uncomplete todos

app.post("/api/uncompleteTodo",(request,response)=>{
  let sqlstmt = "update todos set completed='"+request.body.completed+"'  where id = "+request.body.id;
  connection.query(sqlstmt,(err,result)=>{
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: 'One Todo editing',
      })
    );
  })
})

//fetch All todos

app.get('/api/fetchTodos', (request, response) => {
  let sqlstmt = `select * from todos order by created_date DESC`;
  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: result,
      })
    );
  });
});

// delete single todo

app.get('/api/deleteTodo/:id', (request, response) => {
  let sqlstmt = `delete from todos where id = ` + request.params.id;
  connection.query(sqlstmt, (err, result) => {
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: result,
      })
    );
  });
});


// update Todo

app.post('/api/updateTodo',(request,response)=>{
  let sqlstmt = "update todos set title = '"+request.body.title+"' where id = "+request.body.id;
  connection.query(sqlstmt,(err,result)=>{
    if (err) throw err;
    response.send(
      JSON.stringify({
        status: 200,
        response: "one record Updated",
      })
    );
  })
})
