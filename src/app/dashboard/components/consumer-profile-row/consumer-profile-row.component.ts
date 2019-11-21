import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router, NavigationExtras } from "@angular/router";

// Models
import { ConsumerProfile } from "../../models/consumer-profile.interface";

@Component({
    selector: "vib-consumer-profile-row",
    templateUrl: "consumer-profile-row.component.html",
    styleUrls: ["consumer-profile-row.component.scss"]
})

export class ConsumerProfileRowComponent {
    @Input() consumerProfile: ConsumerProfile;

    constructor(private router: Router) { }

    viewDetails() {
        this.router.navigateByUrl(`/dashboard/appointment/${this.consumerProfile.appointment_id}`);
    }

    connect() {
        this.router.navigate(
            [
                "/dashboard",
                "appointment",
                this.consumerProfile.appointment_id
            ],
            {
                queryParams: { startCall: true },
                preserveQueryParams: false
            }
        );
    }
}
