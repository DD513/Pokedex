import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { PokemonService } from "../../core/services/pokemon.service";
import { PokemonDictionaryEntry } from "../../core/models/pokemon-dictionary.model";

@Component({
  selector: "app-pokemon-dictionary",
  templateUrl: "./pokemon-dictionary.component.html",
  styleUrls: ["./pokemon-dictionary.component.css"],
})
export class PokemonDictionaryComponent implements OnInit {
  pokemonDictionaryList: any[] = [];
  pokemonList: PokemonDictionaryEntry[] = [];
  filteredPokemonList: PokemonDictionaryEntry[] = [];
  searchQuery: string = "";

  constructor(
    private pokemonService: PokemonService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPokemonData();
  }

  loadPokemonData(): void {
    // 取得寶可夢字典中每隻寶可夢的詳細資訊
    this.getPokemonDictionaryList();
  }

  // 取得寶可夢字典中每隻寶可夢的詳細資訊
  getPokemonDictionaryList(): void {
    // 🔹 取得寶可夢字典Url清單
    this.pokemonService
      .getPokemonDictionaryUrlList()
      .subscribe((UrlListResponse) => {
        this.pokemonDictionaryList = UrlListResponse.results;
        console.log("URL Result:", this.pokemonDictionaryList);

        // 🔹 再次請求每隻寶可夢的詳細資訊 (species & sprites)
        this.getPokemonSpeciesAndSprites();
      });
  }

  // 取得每隻寶可夢的species名稱和sprites
  getPokemonSpeciesAndSprites(): void {
    this.pokemonService
      .getPokemonSpeciesAndSprites(this.pokemonDictionaryList)
      .subscribe((updatedData) => {
        this.pokemonDictionaryList = updatedData;
        console.log(
          "取得的Species和Sprites的寶可夢資料:",
          this.pokemonDictionaryList
        );
        // 取得寶可夢的多語言分類名稱
        this.getPokemonGeneraNames();
      });
  }

  // 取得每隻寶可夢的多語言分類名稱
  getPokemonGeneraNames(): void {
    this.pokemonService
      .getPokemonGeneraNames(this.pokemonDictionaryList)
      .subscribe((updatedList) => {
        this.pokemonDictionaryList = updatedList;
        console.log("完整的寶可夢資料:", this.pokemonDictionaryList);
        this.filteredPokemonList = [...this.pokemonDictionaryList];
        this.cdr.detectChanges(); // 確保 UI 更新
      });
  }

  updateSearchQuery(query: string): void {
    this.searchQuery = query;
    this.updateFilteredPokemonDictionaryList();
  }

  updateFilteredPokemonDictionaryList(): void {
    const lowerSearchQuery = this.searchQuery.toLowerCase().trim();

    this.filteredPokemonList = this.pokemonDictionaryList.filter((pokemon) =>
      [
        pokemon.names.englishName,
        pokemon.names.chineseName,
        pokemon.names.simplifiedChineseName,
        pokemon.names.koreanName,
        pokemon.names.japaneseName,
      ].some((value) => value.toLowerCase().includes(lowerSearchQuery))
    );
    console.log(
      "Filtered Pokemon List:",
      this.filteredPokemonList,
      this.searchQuery
    );

    this.cdr.detectChanges();
  }
}
