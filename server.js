var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var TASKS_COLLECTION = "tasks";

var app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
var db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/camilleitor",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  function (err, client) {
    if (err) {
      console.log(err);
      process.exit(1);
    }

    // Save database object from the callback for reuse.
    db = client.db();
    console.log("Database connection ready");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function () {
      var port = server.address().port;
      console.log("App now running on port", port);
    });
  }
);

// TASKS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({ error: message });
}

/*  "/api/tasks"
 *    GET: finds all tasks
 *    POST: creates a new task
 */

app.get("/api/tasks", function (req, res) {
  db.collection(TASKS_COLLECTION)
    .find({})
    .toArray(function (err, docs) {
      if (err) {
        handleError(res, err.message, "Failed to get tasks.");
      } else {
        res.status(200).json(docs);
      }
    });
});

app.post("/api/tasks", function (req, res) {
  var newTask = req.body;
  newTask.createDate = new Date();

  if (!req.body.name) {
    handleError(res, "Invalid user input", "Must provide a name.", 400);
  } else {
    db.collection(TASKS_COLLECTION).insertOne(newTask, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new task.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/tasks/:id"
 *    GET: find task by id
 *    PUT: update task by id
 *    DELETE: deletes task by id
 */

app.get("/api/tasks/:id", function(req, res) {
  db.collection(TASKS_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get task");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/tasks/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(TASKS_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update task");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

app.delete("/api/tasks/:id", function(req, res) {
  db.collection(TASKS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete task");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
