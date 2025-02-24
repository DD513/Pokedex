import { Component, OnInit, OnDestroy, ChangeDetectorRef } from "@angular/core";
import { Pokemon } from "../../core/models/pokemon.model";
import { PokemonService } from "../../core/services/pokemon.service";
import { IMAGE_PATHS } from "../../core/constants/image-paths";
import { ViewMode } from "../../core/constants/enums/view-mode.enum";
import { Subscription } from "rxjs";

@Component({
  selector: "app-pokedex",
  templateUrl: "./pokedex.component.html",
  styleUrls: ["./pokedex.component.css"],
})
export class PokedexComponent implements OnInit, OnDestroy {
  pokemonList: Pokemon[] = [];
  filteredPokemonList: Pokemon[] = [];
  currentViewMode: ViewMode = ViewMode.All; // 🔹 當前的視圖模式
  viewModeEnum = ViewMode; // 🔹 讓 HTML 可存取 `viewModeEnum.Favorites`
  searchQuery: string = ""; // 🔹 存放目前搜尋字串
  private favoriteSubscription!: Subscription; // 訂閱 (subscribe) PokemonService 的收藏變化 (getFavoritesObservable())

  // 🔹 圖片路徑
  notFound = IMAGE_PATHS.NOT_FOUND;

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getAllPokemon();
    this.filteredPokemonList = [...this.pokemonList];
    console.log(this.filteredPokemonList);

    // 訂閱收藏狀態變化，當收藏變化時自動更新 UI
    this.favoriteSubscription = this.pokemonService
      .getFavoritesObservable()
      .subscribe(() => {
        this.updateFilteredPokemonList();
      });
  }

  ngOnDestroy(): void {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }

  /**
   *  更新搜尋條件，並重新篩選寶可夢
   */
  updateSearchQuery(query: string): void {
    this.searchQuery = query;
    this.updateFilteredPokemonList();
  }

  /**
   *  根據搜尋條件與收藏狀態，更新篩選後的寶可夢列表
   */
  updateFilteredPokemonList(): void {
    let result = this.pokemonService.searchPokemon(this.searchQuery);
    if (this.currentViewMode === this.viewModeEnum.Favorites) {
      result = result.filter((pokemon) => this.checkIsInFavorites(pokemon));
    }
    this.filteredPokemonList = result;
    this.cdr.detectChanges();
  }

  /**
   * 確認寶可夢是否在收藏清單中
   */
  checkIsInFavorites(pokemon: Pokemon): boolean {
    return this.pokemonService.checkIsFavorite(pokemon);
  }

  /**
   * 收藏 / 取消收藏某隻寶可夢
   */
  toggleFavorite(pokemon: Pokemon): void {
    this.pokemonService.toggleFavorite(pokemon);
    // 🔹 直接更新 `filteredPokemonList`，不重新執行 `filterPokemon()`，避免畫面跳動
    const index = this.filteredPokemonList.findIndex(
      (p) => p.Code === pokemon.Code
    );
    if (index !== -1) {
      // 只更新該寶可夢的狀態。
      // 使用 `...pokemon` ，確保 filteredPokemonList 是新的物件參考 (Reference)，避免 Angular 變更偵測 (Change Detection) 沒有偵測到變化。
      this.filteredPokemonList[index] = { ...pokemon };
    }
  }

  /**
   *  切換顯示模式
   */
  toggleViewMode(): void {
    this.currentViewMode =
      this.currentViewMode === this.viewModeEnum.All
        ? this.viewModeEnum.Favorites
        : this.viewModeEnum.All;
    this.updateFilteredPokemonList();
  }

  /**
   *  清空所有收藏寶可夢
   */
  clearAllFavorites(): void {
    this.pokemonService.clearFavorites();
    this.updateFilteredPokemonList();
  }
}
