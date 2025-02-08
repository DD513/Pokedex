import { Component, OnInit } from "@angular/core";
import { Pokemon } from "../../models/pokemon.model";
import { PokemonService } from "../../shared/services/pokemon.service";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.css"],
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  searchQuery: string = "";
  isComposing: boolean = false; // 追蹤中文組字狀態
  private searchSubject: Subject<string> = new Subject<string>(); // RxJS Subject

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getAllPokemon();
    this.filteredPokemonList = [...this.pokemonList];

    // 訂閱防抖搜尋事件
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.filteredPokemonList = this.pokemonService.searchPokemon(query);
    });
  }

  onSearch(): void {
    if (this.isComposing) return; // 組字進行中，不觸發搜尋
    this.searchSubject.next(this.searchQuery); // 將輸入值推送至 Subject
  }

  onCompositionEnd(): void {
    this.isComposing = false; // 組字完成
    this.searchSubject.next(this.searchQuery); // 組字完成後執行搜尋
  }

  // 從 service 獲取寶可夢types顏色
  getTypeColor(type: string): string {
    return this.pokemonService.getTypeColor(type);
  }
}
