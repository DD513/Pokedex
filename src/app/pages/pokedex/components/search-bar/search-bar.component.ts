import { Component, EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "pokedex-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.css"],
})
export class PokedexSearchBarComponent {
  searchQuery: string = "";
  isComposing: boolean = false; // 追蹤中文組字狀態
  private querySubject: Subject<string> = new Subject<string>(); // RxJS Subject

  @Output() queryChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    // 訂閱防抖搜尋事件
    this.querySubject.pipe(debounceTime(300)).subscribe((query) => {
      this.queryChange.emit(query);
    });
  }

  handleInputChange(): void {
    if (this.isComposing) return;
    this.querySubject.next(this.searchQuery); // ✅ 觸發防抖處理
  }

  handleCompositionEnd(): void {
    this.isComposing = false;
    this.querySubject.next(this.searchQuery);
  }
}
