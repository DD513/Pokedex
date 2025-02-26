import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { PokemonService } from "../../core/services/pokemon.service";
import { PokemonDictionaryEntry } from "../../core/models/pokemon-dictionary.model";

@Component({
  selector: "app-pokemon-dictionary",
  templateUrl: "./pokemon-dictionary.component.html",
  styleUrls: ["./pokemon-dictionary.component.css"],
})
export class PokemonDictionaryComponent implements OnInit {
  pokemonDictionaryList: PokemonDictionaryEntry[] = [];
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
    this.pokemonService.getFullPokemonDictionary().subscribe((fullData) => {
      this.pokemonDictionaryList = fullData;
      this.filteredPokemonList = [...fullData];
      // console.log("完整的寶可夢資料:", this.pokemonDictionaryList);
      this.cdr.detectChanges();
    });
  }

  updateSearchQuery(query: string): void {
    this.searchQuery = query;
    this.updateFilteredPokemonDictionaryList();
  }

  updateFilteredPokemonDictionaryList(): void {
    const lowerSearchQuery = this.searchQuery.toLowerCase().trim();

    this.filteredPokemonList = this.pokemonDictionaryList.filter((pokemon) =>
      Object.values(pokemon.names).some((value) =>
        value.toLowerCase().includes(lowerSearchQuery)
      )
    );
    this.cdr.detectChanges();
  }
}
