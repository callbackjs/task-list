var http = require('http');
var url = require('url');
var fs = require('fs');

/* Reads the file at the given path and serves it to the client. The
 * Content-Type header will be set to the provided contentType. */
function readAndServe(path, contentType, response) {
  fs.readFile(path, function(error, data) {
    if (error) {
      throw error;
    }

    response.writeHead(200, {'Content-type': contentType});
    response.write(data);
    response.end();
  });
}

/* Creates a task with the given text. Calls the callback when finished. */
function createTask(text, callback) {
  readTasks(function(tasks) {
    tasks.push({ text: text });
    writeTasks(tasks, callback);
  });
}

/* Reads all tasks from the filesystem. Calls the given callback, passing in an
 * array of tasks, when finished. */
function readTasks(callback) {
  fs.readFile('tasks', function(error, contents) {
    if (error) {
      throw error;
    }

    var tasks;
    if (contents.length === 0) {
      tasks = [];
    } else {
      tasks = JSON.parse(contents);
    }

    callback(tasks);
  });
}

/* Writes the given tasks to the filesystem. Calls the given callback when
 * finished. */
function writeTasks(tasks, callback) {
  var tasksJSON = JSON.stringify(tasks);
  fs.writeFile('tasks', tasksJSON, function(error) {
    if (error) {
      throw error;
    }

    callback();
  });
}

/* Reads the JSON body of the request and parses it. Calls the given callback,
 * passing in the parsed object. */
function readJSONBody(request, callback) {
  var body = '';
  request.on('data', function(chunk) {
    body += chunk;
  });

  request.on('end', function() {
    var data = JSON.parse(body);
    callback(data);
  });
}

/* Serves files for the task list, and provides routes to create/delete tasks. */
http.createServer(function(request, response) {
  var pathname = url.parse(request.url).pathname;

  if (request.method === "GET") {
    if (pathname === "/") {
      readAndServe('index.html', 'text/html', response);
    } else if (pathname === "/css/style.css" ||
               pathname === "/css/normalize.css") {
      readAndServe('.' + pathname, 'text/css', response);
    } else if (pathname === "/js/script.js" ||
               pathname === "/js/handlebars.js") {
      readAndServe('.' + pathname, 'text/javascript', response);
    } else if (pathname === "/images/pattern.png") {
      readAndServe('.' + pathname, 'image/png', response);
    } else if (pathname === "/tasks") {
      readTasks(function(tasks) {
        response.writeHead(200, {'Content-type': 'application/json'});
        response.write(JSON.stringify(tasks));
        response.end();
      });
    } else {
      response.end();
    }
  } else if (request.method === "POST") {
    if (pathname === "/tasks") {
      readJSONBody(request, function(task) {
        createTask(task.text, function() {
          // must wait until task is stored before returning response
          response.end();
        });
      });
    } else {
      response.end();
    }
  } else {
    response.end();
  }
}).listen(8000, '127.0.0.1');

console.log('Running on 127.0.0.1:8000');
