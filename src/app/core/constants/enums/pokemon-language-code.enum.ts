import { PokemonNameTranslations } from "../..//models/pokemon-dictionary.model";

export enum PokemonLanguageCode {
  English = "en",
  Japanese = "ja",
  Korean = "ko",
  TraditionalChinese = "zh-Hant",
  SimplifiedChinese = "zh-Hans",
}

// 讓 `PokemonLanguageCode` 直接對應 `PokemonNameTranslations` 的欄位名稱
// Record<TypeA, TypeB> 的作用，PokemonLanguageCode對應key，keyof PokemonNameTranslations對應值。
export const PokemonLanguageMapping: Record<
  PokemonLanguageCode,
  keyof PokemonNameTranslations
> = {
  [PokemonLanguageCode.English]: "englishName",
  [PokemonLanguageCode.Japanese]: "japaneseName",
  [PokemonLanguageCode.Korean]: "koreanName",
  [PokemonLanguageCode.TraditionalChinese]: "traditionalChineseName",
  [PokemonLanguageCode.SimplifiedChinese]: "simplifiedChineseName",
};
