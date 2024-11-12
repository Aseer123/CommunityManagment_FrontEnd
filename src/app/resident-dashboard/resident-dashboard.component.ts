import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceService, Task } from '../maintainence.service';
import { NotificationService, Notification } from '../notification.service';

@Component({
  selector: 'app-resident-dashboard',
  templateUrl: './resident-dashboard.component.html',
  styleUrls: ['./resident-dashboard.component.css']
})
export class ResidentDashboardComponent implements OnInit {
  tasks: Task[] = [];
  notifications: Notification[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private maintenanceService: MaintenanceService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.loadNotifications();
  }

  loadTasks() {
    this.loading = true;
    this.maintenanceService.getAllTasks().subscribe({
      next: (data) => {
        this.tasks = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.errorMessage = 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  loadNotifications() {
    this.notificationService.getNotificationsByRole('RESIDENT').subscribe({
      next: (data) => {
        this.notifications = data;
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
        this.errorMessage = 'Failed to load notifications';
      }
    });
  }

  getStatusClass(status: string): string {
    return status.toLowerCase().replace('_', '-');
  }

  clearError() {
    this.errorMessage = '';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
  }
}