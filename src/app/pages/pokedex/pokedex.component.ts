import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Pokemon } from "../../core/models/pokemon.model";
import { PokemonService } from "../../core/services/pokemon.service";
import { IMAGE_PATHS } from "../../core/constants/image-paths";
import { ViewMode } from "../../core/constants/enums/view-mode.enum";

import { Subject, Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.css"],
})
export class PokedexComponent implements OnInit {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  viewMode: ViewMode = ViewMode.All; // 預設為 `ALL`
  ViewMode = ViewMode; // ✅ 這樣 HTML 才能讀取 `ViewMode.Favorites`
  searchQuery: string = ""; // 🔹 存放目前搜尋字串
  private favoriteSubscription!: Subscription;
  private searchSubject: Subject<string> = new Subject<string>(); // RxJS Subject

  // 🔹 圖片路徑
  notFound = IMAGE_PATHS.NOT_FOUND;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getAllPokemon();
    this.filteredPokemonList = [...this.pokemonList];

    // 訂閱防抖搜尋事件
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      this.searchQuery = query; // 🔹 儲存搜尋條件
      this.filterPokemon();
    });

    // 訂閱收藏狀態變化，當收藏變化時自動更新 UI
    this.favoriteSubscription = this.pokemonService
      .getFavoritesObservable()
      .subscribe(() => {
        this.filterPokemon();
      });
  }

  ngOnDestroy(): void {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
    this.searchSubject.complete();
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  filterPokemon(): void {
    let result = this.pokemonService.searchPokemon(this.searchQuery);
    if (this.viewMode === ViewMode.Favorites) {
      result = result.filter((pokemon) => this.isFavorite(pokemon));
    }
    this.filteredPokemonList = result;
    this.cdr.detectChanges();
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.pokemonService.isFavorite(pokemon);
  }

  toggleFavorite(pokemon: Pokemon): void {
    this.pokemonService.toggleFavorite(pokemon);
    // 🔹 直接更新 `filteredPokemonList`，不重新執行 `filterPokemon()`，避免畫面跳動
    const index = this.filteredPokemonList.findIndex(
      (p) => p.Code === pokemon.Code
    );
    console.log(index, "index");
    if (index !== -1) {
      // 只更新該寶可夢的狀態。
      // 使用 `...pokemon` ，確保 filteredPokemonList 是新的物件參考 (Reference)，避免 Angular 變更偵測 (Change Detection) 沒有偵測到變化。
      this.filteredPokemonList[index] = { ...pokemon };
    }
  }

  toggleShowFavorites(): void {
    this.viewMode =
      this.viewMode === ViewMode.All ? ViewMode.Favorites : ViewMode.All;
    this.filterPokemon();
  }

  clearAllFavorites(): void {
    this.pokemonService.clearFavorites();
    this.filterPokemon();
  }
}
