import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl
} from "@angular/forms";
import { trigger, transition, style, animate } from "@angular/animations";

@Component({
  selector: "vib-profile-languages",
  templateUrl: "./profile-languages.component.html",
  styleUrls: ["./profile-languages.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms", style({ opacity: 1 }))
      ]),
      transition(":leave", [
        style({ opacity: 1 }),
        animate("300ms", style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ProfileLanguagesComponent implements OnInit {
  addLanguageForm: FormGroup;
  @Input() languages: string[];
  @Input() availableLanguages: string[];
  @Output() updateLanguages = new EventEmitter<string[]>();
  adding = false;
  constructor() {}

  ngOnInit() {
    this.addLanguageForm = new FormGroup({
      language: new FormControl("", Validators.required)
    });
  }

  addLanguage() {
    this.languages.push(this.addLanguageForm.value["language"]);
    this.updateLanguages.emit(this.languages);
    this.toggleForm();
  }

  removeLanguage(language: string) {
    const index: number = this.languages.indexOf(language);

    if (index !== -1) {
      this.languages.splice(index, 1);
    }
    this.updateLanguages.emit(this.languages);
  }

  checkErrors(field: AbstractControl): boolean {
    return field.invalid;
  }

  toggleForm() {
    this.adding = !this.adding;
  }
}
