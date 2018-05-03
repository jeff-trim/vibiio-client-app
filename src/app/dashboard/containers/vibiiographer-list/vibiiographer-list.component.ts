import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { User } from '../../models/user.interface';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'vib-vibiiographer-list',
  templateUrl: './vibiiographer-list.component.html',
  styleUrls: ['./vibiiographer-list.component.scss']
})
export class VibiiographerListComponent implements OnInit {
  vibiiographers: User[];

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private userService: UsersService) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data) => {
      this.vibiiographers = data.vibiiographers;
    });
  }

  search(query?: string) {
    this.userService.index('Vibiiographer', query).subscribe( data => {
      this.vibiiographers = data;
    });
  }

  // save for later
  // viewDetails(id: number) {
  //   this.router.navigateByUrl('/users/' + id);
  // }
}
