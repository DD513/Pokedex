import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { POKEMON_DATA } from "../data/pokemon.data";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonData: Pokemon[] = POKEMON_DATA;

  constructor() {}

  // 獲取所有寶可夢資料
  getAllPokemon(): Pokemon[] {
    return this.pokemonData;
  }

  // 根據編號查詢寶可夢
  getPokemonByCode(code: string): Pokemon | undefined {
    return this.pokemonData.find((pokemon) => pokemon.Code === code);
  }

  // 搜尋寶可夢
  searchPokemon(query: string): Pokemon[] {
    const lowerQuery = query.toLowerCase().trim();
    return this.pokemonData.filter(
      (pokemon) =>
        pokemon.ChineseName.toLowerCase().includes(lowerQuery) ||
        pokemon.EnglishName.toLowerCase().includes(lowerQuery) ||
        pokemon.Types.some((type) =>
          type.Name.toLowerCase().includes(lowerQuery)
        )
    );
  }

  // 隨機抽取一隻寶可夢
  getRandomPokemon(): Pokemon {
    const randomIndex = Math.floor(Math.random() * this.pokemonData.length);
    return this.pokemonData[randomIndex];
  }

  // 寶可夢類型顏色對應
  getTypeColor(type: string): string {
    const typeColors: { [key: string]: string } = {
      草: "#78C850",
      毒: "#A040A0",
      火: "#F08030",
      水: "#6890F0",
      一般: "#A8A878",
      飛行: "#A890F0",
      電: "#F8D030",
      地面: "#E0C068",
      妖精: "#EE99AC",
      超能力: "#F85888",
      格鬥: "#C03028",
      岩石: "#B8A038",
      冰: "#98D8D8",
      龍: "#7038F8",
      鋼: "#B8B8D0",
      幽靈: "#705898",
      昆蟲: "#A8B820",
      暗黑: "#705848",
    };
    return typeColors[type] || "#FFCB05"; // 預設黃色
  }
}
