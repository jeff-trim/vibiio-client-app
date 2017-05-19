import { TestBed, async } from '@angular/core/testing';
import { PasswordResetFormComponent } from './password-reset-form.component';
import { Credentials } from '../../models/credentials.interface';

describe('PasswordResetFormComponent', () => {
    beforeEach(async(()=>{
        TestBed.configureTestingModule({
            imports: [],
            declarations: [
                PasswordResetFormComponent
            ]}).compileComponents();
    }))
});
