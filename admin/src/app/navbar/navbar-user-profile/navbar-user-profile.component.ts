import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { User } from 'firebase';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'navbar-user-profile',
  templateUrl: './navbar-user-profile.component.html',
  styleUrls: ['./navbar-user-profile.component.scss']
})
export class NavbarUserProfileComponent implements OnInit {
  user: User = null;

  constructor(private authService: AuthService, private changeDetector: ChangeDetectorRef) {}

  ngOnInit() {
    this.authService.userStatusChangedSubscription((user: User) => {
      this.user = user;
      this.changeDetector.detectChanges();
    });
  }

  logout() {
    this.authService.logout();
  }
}
