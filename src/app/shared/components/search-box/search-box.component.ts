import { Component, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "vib-search-box",
  templateUrl: "./search-box.component.html",
  styleUrls: ["./search-box.component.scss"]
})
export class SearchBoxComponent {
  @Output() queryEmitter = new EventEmitter<string>();

  didSeaarch = false;
  searchValue = "";

  search() {
    this.searchValue = this.searchValue.trim();
    this.queryEmitter.emit(this.searchValue);
    if (this.searchValue.length > 0) {
      this.didSeaarch = true;
    }
  }

  clear() {
    this.searchValue = "";
    this.queryEmitter.emit(this.searchValue);
    this.didSeaarch = false;
  }

}
