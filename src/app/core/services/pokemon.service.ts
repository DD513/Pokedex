import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, forkJoin } from "rxjs";
import { map, switchMap } from "rxjs/operators";

import { Pokemon } from "../models/pokemon.model";
import {
  PokemonDictionaryEntry,
  PokemonDictionaryUrlResponse,
  PokemonNameTranslations,
} from "../models/pokemon-dictionary.model";
import { POKEMON_DATA } from "../data/pokemon.data";
import { ApiService } from "./api.service";
import {
  PokemonType,
  PokemonTypeColors,
} from "../constants/enums/pokemon-type.enum";
import { PokemonLanguageMapping } from "../constants/enums/pokemon-language-code.enum";

@Injectable({
  providedIn: "root",
})
export class PokemonService {
  private pokemonData: Pokemon[] = POKEMON_DATA;
  private favoritePokemonCodes: Set<string> = new Set();
  private favoritesSubject = new BehaviorSubject<Set<string>>(new Set()); // 讓 PokedexComponent 可以訂閱收藏變化

  constructor(private apiService: ApiService) {
    this.loadFavorites();
  }

  // ngOnInit() {
  //   this.loadFavorites();
  // }

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
        this.favoritePokemonCodes.clear();
      }
    }
  }

  // 檢查是否已收藏
  checkIsFavorite(pokemon: Pokemon): boolean {
    return this.favoritePokemonCodes.has(pokemon.Code);
  }

  // 切換收藏狀態
  toggleFavorite(pokemon: Pokemon): void {
    const isFavorite = this.favoritePokemonCodes.has(pokemon.Code);
    isFavorite
      ? this.favoritePokemonCodes.delete(pokemon.Code)
      : this.favoritePokemonCodes.add(pokemon.Code);

    if (!isFavorite) {
      localStorage.setItem(
        "favoritePokemon",
        JSON.stringify([...this.favoritePokemonCodes])
      );
    } else {
      localStorage.removeItem("favoritePokemon"); // 🔹 若全部刪除則清空 localStorage
    }

    this.favoritesSubject.next(this.favoritePokemonCodes);
  }

  // 取得所有收藏的寶可夢
  getFavoritePokemon(): Pokemon[] {
    return this.pokemonData.filter((pokemon) =>
      this.favoritePokemonCodes.has(pokemon.Code)
    );
  }

  // 監聽收藏狀態變化
  getFavoritesObservable(): Observable<Set<string>> {
    return this.favoritesSubject.asObservable();
  }

  // 清空收藏
  clearFavorites(): void {
    this.favoritePokemonCodes.clear();
    localStorage.setItem("favoritePokemon", JSON.stringify([]));
    this.favoritesSubject.next(new Set());
  }

  // 寶可夢類型顏色對應
  getTypeColor(type: string): string {
    // 轉換 `string` → `PokemonType`
    const pokemonType = Object.values(PokemonType).find((t) => t === type);

    return pokemonType ? PokemonTypeColors[pokemonType] : "#FFCB05";
  }

  // Pokemon Dictionary
  // 取得完整的寶可夢字典（包含名稱、圖片、多語言分類）
  // 這邊選擇SwitchMap，因為這些 API 有依賴關係，完成後才能進行下一個，而不是同時進行。mergeMap適用於同時進行的請求，concatMap適用於順序進行的請求。
  getFullPokemonDictionary(
    offset: number,
    limit: number
  ): Observable<PokemonDictionaryEntry[]> {
    return this.getPokemonDictionaryUrlList(offset, limit).pipe(
      switchMap(
        (urlListResponse) => this.getPokemonSpeciesAndSprites(urlListResponse) // 取得物種資訊和圖片
      ),
      switchMap(
        (speciesAndSpritesList) => this.getPokemonNames(speciesAndSpritesList) // 取得多語言分類名稱
      )
    );
  }

  // 取得寶可夢字典的URL列表
  private getPokemonDictionaryUrlList(
    offset: number,
    limit: number
  ): Observable<PokemonDictionaryEntry[]> {
    return this.apiService.getPokemonUrlList(offset, limit).pipe(
      map((response: PokemonDictionaryUrlResponse) =>
        response.results.map((pokemon) => ({
          pokemonName: pokemon.name,
          url: pokemon.url,
          speciesName: "",
          speciesUrl: "",
          imageUrl: "",
          names: this.initializePokemonNames(),
        }))
      )
    );
  }

  // 取得寶可夢物種和圖片(species, sprites)
  private getPokemonSpeciesAndSprites(
    pokemonList: PokemonDictionaryEntry[]
  ): Observable<PokemonDictionaryEntry[]> {
    return forkJoin(
      // forkJoin 同時發送多個請求，等待所有請求完成後再返回。 combineLastest 是持續監聽，會發送最新的值。 zip 是同時進行，當所有 Observable 都有對應數據時才發送，適合一對一數據匹配。
      pokemonList.map((pokemon) =>
        this.apiService.getPokemonDetails(pokemon.url).pipe(
          map((data) => ({
            ...pokemon,
            speciesName: data.species.name,
            speciesUrl: data.species.url,
            imageUrl: data.sprites.front_default,
          }))
        )
      )
    );
  }

  // 取得寶可夢的多語言分類名稱
  private getPokemonNames(
    pokemonList: PokemonDictionaryEntry[]
  ): Observable<PokemonDictionaryEntry[]> {
    // console.log("speciesAndSpritesList", pokemonList);
    return forkJoin(
      pokemonList.map((pokemon) =>
        this.apiService.getPokemonSpeciesDetails(pokemon.speciesUrl).pipe(
          map((response) => ({
            ...pokemon,
            names: this.extractAllNames(response.names),
          }))
        )
      )
    );
  }

  // 初始化 `names`，避免 undefined
  private initializePokemonNames(): PokemonNameTranslations {
    // reduce 可以用來累積（accumulate）資料，並轉換成一個新的值。 ["en", "englishName"],["ja", "japaneseName"]轉換為englishName: "",japaneseName: "",。
    return Object.values(PokemonLanguageMapping).reduce(
      (pokemonNames, displayName) => {
        pokemonNames[displayName] = "";
        return pokemonNames;
      },
      {} as PokemonNameTranslations
    );
  }

  // this.extractAllNames(response.names) 轉換 en、ja 等語言代碼為 englishName、japaneseName。
  private extractAllNames(namesList: any[]): PokemonNameTranslations {
    // Object.entries(PokemonLanguageMapping) 會返回 [key, value]，即：["en", "englishName"],["ja", "japaneseName"],接著用 reduce() 轉換成 englishName: "Ivysaur",japaneseName: "フシギソウ",
    return Object.entries(PokemonLanguageMapping).reduce(
      (pokemonNames, [languageCode, displayName]) => {
        pokemonNames[displayName] = this.extractNameByLanguage(
          namesList,
          languageCode
        );
        return pokemonNames;
      },
      {} as PokemonNameTranslations
    ); // {} 是初始值，表示建立一個物件
  }

  // 提取特定語言的名稱
  private extractNameByLanguage(
    namesList: any[],
    languageCode: string
  ): string {
    const nameEntry = namesList.find(
      (entry) => entry.language.name === languageCode
    );
    return nameEntry ? nameEntry.name : "";
  }
}
