import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TaskService } from '../task.service';
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  providers: [TaskService],
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  selectedTask: Task;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getTasks().then((tasks: Task[]) => {
      this.tasks = tasks.map((task) => {
        return task;
      });
    });
  }

  private getIndexOfTask = (taskId: String) => {
    return this.tasks.findIndex((task) => {
      return task._id === taskId;
    });
  };

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  createNewTask() {
    var task: Task = {
      room: '',
      name: '',
      hour: '',
      transport: '',
      oxigen: false,
      destination: '',
      estat: {
        estat:'',
        color:''
      }
    };

    // By default, a newly-created contact will have the selected state.
    this.selectTask(task);
  }

  deleteTask = (taskId: String) => {
    var idx = this.getIndexOfTask(taskId);
    if (idx !== -1) {
      this.tasks.splice(idx, 1);
      this.selectTask(null);
    }
    return this.tasks;
  };

  addTask = (task: Task) => {
    this.tasks.push(task);
    this.selectTask(task);
    return this.tasks;
  };

  updateTask = (task: Task) => {
    var idx = this.getIndexOfTask(task._id);
    if (idx !== -1) {
      this.tasks[idx] = task;
      this.selectTask(task);
    }
    return this.tasks;
  };
}