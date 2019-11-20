import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";

// Models
import { ConsumerProfile } from "../../models/consumer-profile.interface";

@Component({
    selector: "vib-consumer-profile-row",
    templateUrl: "consumer-profile-row.component.html",
    styleUrls: ["consumer-profile-row.component.scss"]
})

export class ConsumerProfileRowComponent {
    @Input() consumerProfile: ConsumerProfile;
    @Output() startVibiio = new EventEmitter<boolean>();

    constructor(private router: Router) { }

    viewDetails() {
        this.router.navigateByUrl(`/dashboard/appointment/${this.consumerProfile.appointment_id}`);
    }

    connect() {
        this.startVibiio.emit(true);
    }
}
