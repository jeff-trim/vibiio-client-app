import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent implements OnInit {
    @Input()
    profileData

    ngOnInit(){
        console.log(this.profileData)
    }
}
