// import { TestBed, async } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { AppComponent } from './app.component';
// import { RouterModule, Routes } from '@angular/router';
// // import { RouterOutletStubComponent } from '../../testing/router-stubs';
// // import { RouterLinkStubDirective } from '../../testing/router-stubs';


// describe('AppComponent', () => {
//     beforeEach(async(() => {
//         class RouterStub {
//             navigateByUrl(url: string) { return url; }
//         }

//       TestBed.configureTestingModule({
//     imports: [
//         RouterModule
        
//     ],
//       declarations: [
//           AppComponent      ],
//           providers: [
//               { provide: Router, useClass: RouterStub }
//           ]
//     }).compileComponents();
//   }));

//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));

//   it(`should have as a title`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('Vibiio Client App');
//   }));

//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).
//       toContain('Vibiio Client App');
//   }));
// });
