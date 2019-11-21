import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";

// Services
import { CustomerStatusCountService } from "../../services/customer-status-count.service";
import { SidebarCustomerStatusSharedService } from "../../../shared/services/sidebar-customer-status-shared.service";

// Interfaces
import { CustomerStatusCount } from "../../models/customer-status-count.interface";

@Component({
    selector: "vib-consumer-profiles-filters",
    templateUrl: "consumer-profiles-filters.component.html",
    styleUrls: ["consumer-profiles-filters.component.scss"]
})

export class ConsumerProfilesFiltersComponent implements OnInit {

    customersCategories: CustomerStatusCount[] = [];

    @Input() displayStatus = "";
    @Output() filterSelected = new EventEmitter<boolean>();

    constructor(private router: Router,
        private statusService: CustomerStatusCountService,
        private sidebarCustomerStatusSharedService: SidebarCustomerStatusSharedService) {

        this.sidebarCustomerStatusSharedService.changeEmitted$.subscribe(
            response => {
                this.getStatusUpdate();
            }
        );
    }

    ngOnInit() {
        this.getStatusUpdate();
    }

    getCategoryParam(status: string) {
       return status.replace(/\s/g, "_").toLowerCase();
    }

    getStatusUpdate() {
        this.statusService
            .getCustomerStatus()
            .subscribe((data: CustomerStatusCount[]) => this.customersCategories = data);
    }
}
