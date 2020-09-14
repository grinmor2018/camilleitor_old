import { Injectable } from '@angular/core';
import { Task } from './task';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable()
export class TaskService {
    private TasksUrl = '/api/tasks';

    constructor (private http: HttpClient) {}

    // get("/api/tasks")
    getTasks(): Promise<void | Task[]> {
      return this.http.get(this.TasksUrl)
                 .toPromise()
                 .then(response => response as Task[])
                 .catch(this.handleError);
    }

    // post("/api/tasks")
    createTask(newTask: Task): Promise<void | Task> {
      return this.http.post(this.TasksUrl, newTask)
                 .toPromise()
                 .then(response => response as Task)
                 .catch(this.handleError);
    }

    // get("/api/tasks/:id") endpoint not used by Angular app

    // delete("/api/tasks/:id")
    deleteTask(delTaskId: String): Promise<void | String> {
      return this.http.delete(this.TasksUrl + '/' + delTaskId)
                 .toPromise()
                 .then(response => response as String)
                 .catch(this.handleError);
    }

    // put("/api/tasks/:id")
    updateTask(putTask: Task): Promise<void | Task> {
      var putUrl = this.TasksUrl + '/' + putTask._id;
      return this.http.put(putUrl, putTask)
                 .toPromise()
                 .then(response => response as Task)
                 .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}

