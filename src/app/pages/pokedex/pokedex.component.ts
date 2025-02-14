import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { Pokemon } from "../../core/models/pokemon.model";
import { PokemonService } from "../../core/services/pokemon.service";
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
  showFavorites: boolean = false; // 🔹 是否只顯示收藏
  private favoriteSubscription!: Subscription;

  private searchSubject: Subject<string> = new Subject<string>(); // RxJS Subject

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pokemonList = this.pokemonService.getAllPokemon();
    this.filteredPokemonList = [...this.pokemonList];

    // 訂閱防抖搜尋事件
    this.searchSubject.pipe(debounceTime(300)).subscribe((query) => {
      // this.filteredPokemonList = this.pokemonService.searchPokemon(query);
      this.filterPokemon(query);
    });

    // 訂閱收藏狀態變化，當收藏變化時自動更新 UI
    this.favoriteSubscription = this.pokemonService
      .getFavoritesObservable()
      .subscribe(() => {
        this.filterPokemon("");
      });
  }

  ngOnDestroy(): void {
    if (this.favoriteSubscription) {
      this.favoriteSubscription.unsubscribe();
    }
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  filterPokemon(query: string): void {
    let result = this.pokemonService.searchPokemon(query);
    if (this.showFavorites) {
      result = result.filter((pokemon) => this.isFavorite(pokemon));
    }
    this.filteredPokemonList = result;
  }

  isFavorite(pokemon: Pokemon): boolean {
    return this.pokemonService.isFavorite(pokemon);
  }

  toggleFavorite(pokemon: Pokemon): void {
    this.pokemonService.toggleFavorite(pokemon);
  }

  toggleShowFavorites(): void {
    this.showFavorites = !this.showFavorites;
    this.filterPokemon("");
    this.cdr.detectChanges(); // 🔹 手動觸發變更檢測，讓 UI 立即更新
  }

  clearAllFavorites(): void {
    this.pokemonService.clearFavorites();
    this.filterPokemon("");
    this.cdr.detectChanges(); // 🔹 清空收藏後手動更新 UI
  }
}
