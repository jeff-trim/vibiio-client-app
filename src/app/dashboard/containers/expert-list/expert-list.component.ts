import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../models/user.interface";
import { UsersService } from "../../../shared/services/users.service";
import { RemoveUnderscorePipe } from "../../../shared/pipes/remove-underscore.pipe";

@Component({
  selector: "vib-expert-list",
  templateUrl: "./expert-list.component.html",
  styleUrls: ["./expert-list.component.scss"]
})
export class ExpertListComponent implements OnInit {
  experts: User[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.experts = data.experts;
    });
  }

  search(query?: string) {
    this.userService.index("Expert", query).subscribe((data: any) => {
      this.experts = data;
    });
  }
}
