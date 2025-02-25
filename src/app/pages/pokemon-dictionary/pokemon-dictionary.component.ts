import { Component, OnInit } from "@angular/core";
import { PokemonDictionaryEntry } from "../../core/models/pokemon-dictionary.model";

@Component({
  selector: "app-pokemon-dictionary",
  templateUrl: "./pokemon-dictionary.component.html",
  styleUrls: ["./pokemon-dictionary.component.css"],
})
export class PokemonDictionaryComponent implements OnInit {
  pokemonList: PokemonDictionaryEntry[] = [];
  filteredPokemonList: PokemonDictionaryEntry[] = [];
  searchQuery: string = "";

  constructor() {}

  ngOnInit(): void {
    this.loadPokemonData();
  }

  loadPokemonData(): void {
    // 模擬 API 或 JSON 資料
    this.pokemonList = [
      {
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
        englishName: "Bulbasaur",
        chineseName: "妙蛙種子",
        simplifiedChineseName: "妙蛙种子",
        koreanName: "이상해씨",
        japaneseName: "フシギダネ",
      },
      {
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
        englishName: "Charmander",
        chineseName: "小火龍",
        simplifiedChineseName: "小火龙",
        koreanName: "파이리",
        japaneseName: "ヒトカゲ",
      },
    ];
    this.filteredPokemonList = [...this.pokemonList];
  }

  onSearch(): void {
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredPokemonList = this.pokemonList.filter((pokemon) =>
      Object.values(pokemon).some((value) =>
        value.toLowerCase().includes(query)
      )
    );
  }
}
