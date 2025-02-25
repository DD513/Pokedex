import { Component, OnInit } from "@angular/core";
import { IMAGE_PATHS } from "../../../../core/constants/image-paths";

@Component({
  selector: "app-pokemon-navbar",
  templateUrl: "./pokemon-navbar.component.html",
  styleUrls: ["./pokemon-navbar.component.css"],
})
export class PokemonNavbarComponent implements OnInit {
  // 🔹 圖片路徑
  homePageLogo = IMAGE_PATHS.HOME_PAGE_LOGO;
  pokedexLogo = IMAGE_PATHS.HOME_POKEDEX_LOGO;
  pokeLotteryLogo = IMAGE_PATHS.HOME_POKELOTTERY_LOGO;
  pokemonDictionaryLogo = IMAGE_PATHS.HOME_POKEMON_DICTIONARY_LOGO;

  constructor() {}

  ngOnInit() {}
}
