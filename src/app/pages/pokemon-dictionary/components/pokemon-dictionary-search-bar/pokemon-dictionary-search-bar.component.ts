import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "pokemon-dictionary-search-bar",
  templateUrl: "./pokemon-dictionary-search-bar.component.html",
  styleUrls: ["./pokemon-dictionary-search-bar.component.css"],
})
export class PokemonDictionarySearchBarComponent implements OnInit {
  isComposing: boolean = false;
  searchQuery: string = "";
  private querySubject: Subject<string> = new Subject<string>();

  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    // 訂閱防抖搜尋事件
    this.querySubject.pipe(debounceTime(300)).subscribe((query) => {
      this.queryChange.emit(query);
    });
  }

  ngOnInit() {}

  handleInputChange(): void {
    if (this.isComposing) return;
    this.querySubject.next(this.searchQuery); // ✅ 觸發防抖處理
  }

  handleCompositionEnd(): void {
    this.isComposing = false;
    this.querySubject.next(this.searchQuery);
  }
}
