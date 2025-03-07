import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../../core/services/pokemon.service";
import { PokemonDictionaryEntry } from "../../../core/models/pokemon-dictionary.model";

@Component({
  selector: "app-pokemon-dictionary",
  templateUrl: "./pokemon-dictionary.component.html",
  styleUrls: ["./pokemon-dictionary.component.css"],
})
export class PokemonDictionaryComponent implements OnInit {
  pokemonDictionaryList: PokemonDictionaryEntry[] = [];
  filteredPokemonList: PokemonDictionaryEntry[] = [];
  searchQuery: string = "";

  offset: number = 0;
  limit: number = 10;
  currentPage: number = 1;
  isLoading: boolean = false;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemonData();
  }

  loadPokemonData(): void {
    // 取得寶可夢字典中每隻寶可夢的詳細資訊
    this.isLoading = true;
    this.pokemonService
      .getFullPokemonDictionary(this.offset, this.limit)
      .subscribe((fullData) => {
        this.pokemonDictionaryList = fullData;
        this.updateFilteredPokemonDictionaryList();
        this.isLoading = false;
        // console.log("完整的寶可夢資料:", this.pokemonDictionaryList);
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
  }

  prevPage(): void {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.currentPage--;
      this.loadPokemonData();
    }
  }

  nextPage(): void {
    this.offset += this.limit;
    this.currentPage++;
    this.loadPokemonData();
  }
}
