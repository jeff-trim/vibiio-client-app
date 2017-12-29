import { Component, Input, EventEmitter, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

// Models
import { MyProfileLicense } from '../../models/my-profile-license.interface';
import { MyProfileService } from '../../services/my-profile.service';
import { MyProfile } from '../../models/my-profile.interface';
import { states } from '../../models/states';

@Component({
    selector: 'vib-profile-information',
    styleUrls: ['profile-information.component.scss'],
    templateUrl: 'profile-information.component.html'
})

export class ProfileInformationComponent implements OnInit, AfterViewInit {
    myProfileForm: FormGroup;
    states: string[];
    selectedState: string;

    @ViewChild('stateselect')
    select: ElementRef;

    @Input() onEdit = false;
    @Input() myProfile: MyProfile;

    updateProfile: EventEmitter<FormGroup> = new EventEmitter;

    constructor() {
        this.states = states;
    }

    ngOnInit() {
        this.myProfileForm = new FormGroup({
                'firstName': new FormControl(this.myProfile.first_name, Validators.required),
                'lastName': new FormControl(this.myProfile.last_name, Validators.required),
                'company': new FormControl(this.myProfile.company, Validators.required),
                'phone': new FormControl(this.myProfile.phone, Validators.required),
                'addressOne': new FormControl(this.myProfile.address.address_one, Validators.required),
                'addressTwo': new FormControl(this.myProfile.address.address_two, Validators.required),
                'city': new FormControl(this.myProfile.address.city, Validators.required),
                'state': new FormControl(this.myProfile.address.state, Validators.required),
                'zip': new FormControl(this.myProfile.address.zip, Validators.required)
        });

        this.selectedState = this.myProfile.address.state;
    }

    ngAfterViewInit() {
        if (this.selectedState) {
          this.myProfileForm.get('state');
          this.select.nativeElement.dispatchEvent( new Event( 'change' ) );
        }
    }

    checkErrors(field: AbstractControl): boolean {
        return (field.invalid);
      }
}
