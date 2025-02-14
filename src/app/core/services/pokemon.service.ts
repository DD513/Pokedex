import { Injectable } from "@angular/core";
import { Pokemon } from "../models/pokemon.model";
import { POKEMON_DATA } from "../data/pokemon.data";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonData: Pokemon[] = POKEMON_DATA;
  private favoritePokemonCodes: Set<string> = new Set();
  private favoritesSubject = new BehaviorSubject<Set<string>>(new Set()); // 讓 PokedexComponent 可以訂閱收藏變化

  constructor() {
    this.loadFavorites();
  }

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

  // 讀取收藏的寶可夢 (從 localStorage)
  private loadFavorites(): void {
    const storedFavorites = localStorage.getItem("favoritePokemon");
    if (storedFavorites) {
      try {
        this.favoritePokemonCodes = new Set(JSON.parse(storedFavorites));
        this.favoritesSubject.next(this.favoritePokemonCodes);
      } catch (error) {
        console.error("無法解析收藏紀錄", error);
        this.favoritePokemonCodes = new Set();
      }
    }
  }

  // 檢查是否已收藏
  isFavorite(pokemon: Pokemon): boolean {
    return this.favoritePokemonCodes.has(pokemon.Code);
  }

  // 切換收藏狀態
  toggleFavorite(pokemon: Pokemon): void {
    if (this.favoritePokemonCodes.has(pokemon.Code)) {
      this.favoritePokemonCodes.delete(pokemon.Code);
    } else {
      this.favoritePokemonCodes.add(pokemon.Code);
    }
    localStorage.setItem(
      "favoritePokemon",
      JSON.stringify([...this.favoritePokemonCodes])
    );

    // 發送更新通知
    this.favoritesSubject.next(this.favoritePokemonCodes);
  }

  // 取得所有收藏的寶可夢
  getFavoritePokemon(): Pokemon[] {
    return this.pokemonData.filter((pokemon) =>
      this.favoritePokemonCodes.has(pokemon.Code)
    );
  }

  // 監聽收藏狀態變化
  getFavoritesObservable() {
    return this.favoritesSubject.asObservable();
  }

  // 清空收藏
  clearFavorites(): void {
    this.favoritePokemonCodes.clear();
    localStorage.removeItem("favoritePokemon");
    this.favoritesSubject.next(new Set());
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
