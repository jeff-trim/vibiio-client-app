import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginFormComponent } from './login-form.component';
import { Credentials } from '../../models/credentials.interface';

const rememberMeMockCredentials = { email: 'faker@fake.com', password: 'password', remember: true };
const dontRememberMeMockCredentials = { email: 'faker@fake.com', password: 'password', remember: false };

describe('LoginFormComponent', () => {
  let fixture, component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        LoginFormComponent
      ]
    }).compileComponents();
  }));

  beforeEach( () => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    // for ngOnInit
    fixture.detectChanges();
  });

  it('should create the login-form component', () => {
    expect(component).toBeDefined();
  });

  it('should call submit event if form valid and user wants to be remembered', () => {
    spyOn(component.submitLogin, 'emit');
    component.login(rememberMeMockCredentials, true);

    fixture.detectChanges();
    expect(component.submitLogin.emit).toHaveBeenCalled();
  });

  it('should call submit event if form valid and user does not want to be remembered', () => {
    spyOn(component.submitLogin, 'emit');
    component.login(dontRememberMeMockCredentials, true);

    fixture.detectChanges();
    expect(component.submitLogin.emit).toHaveBeenCalled();
   });

  it('should not call submit event if form invalid', () => {
    spyOn(component.submitLogin, 'emit');
    component.login(dontRememberMeMockCredentials, false);

    fixture.detectChanges();
    expect(component.submitLogin.emit).not.toHaveBeenCalled();
  });
});


