import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "pokedex-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
})
export class PokedexSearchBarComponent {
  searchQuery: string = "";
  isComposing: boolean = false; // 追蹤中文組字狀態

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  onSearch(): void {
    if (this.isComposing) return;
    this.search.emit(this.searchQuery); // 發送搜尋事件
  }

  onCompositionEnd(): void {
    this.isComposing = false;
    this.search.emit(this.searchQuery);
  }
}
