import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  HostListener,
} from "@angular/core";
import * as Zdog from "zdog";

@Component({
  selector: "app-animal-planet",
  templateUrl: "./animal-planet.component.html",
  styleUrls: ["./animal-planet.component.css"],
})
export class AnimalPlanetComponent implements AfterViewInit {
  @ViewChild("zdogCanvas") zdogCanvas!: ElementRef<HTMLCanvasElement>;

  private illo!: Zdog.Illustration;
  private floatingElements: Zdog.Group[] = [];

  ngAfterViewInit() {
    // 設置初始尺寸
    this.resizeCanvas();

    // 初始化場景
    this.illo = new Zdog.Illustration({
      element: this.zdogCanvas.nativeElement,
      zoom: 1.5,
      dragRotate: true,
    });

    // 星球設計
    this.createPlanet();

    // 開始動畫
    this.animate();
  }

  // 動態調整 canvas 尺寸
  private resizeCanvas() {
    const canvas = this.zdogCanvas.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // 監聽視窗大小變化
  @HostListener("window:resize", ["$event"])
  onResize() {
    this.resizeCanvas();
    this.illo.updateRenderGraph(); // 重新渲染
  }

  private createPlanet() {
    // 星球（用 Group 組合多個形狀）
    const planet = new Zdog.Group({
      addTo: this.illo,
    });

    // 星球主體（橙黃色，稍微不規則）
    new Zdog.Hemisphere({
      addTo: planet,
      diameter: 150,
      stroke: 10,
      color: "#F4C430",
      fill: true,
      backface: "#5DADE2",
    });

    // 藍色部分（不規則形狀，模擬海洋）
    // new Zdog.Shape({
    //   addTo: planet,
    //   path: [
    //     { x: -60, y: 40 },
    //     { x: 60, y: 40 },
    //     {
    //       arc: [
    //         { x: 70, y: 70 },
    //         { x: 20, y: 90 },
    //       ],
    //     },
    //     {
    //       arc: [
    //         { x: -20, y: 90 },
    //         { x: -70, y: 70 },
    //       ],
    //     },
    //   ],
    //   stroke: 10,
    //   color: "#5DADE2",
    //   fill: true,
    // });

    // 隕石坑（不規則斑點）
    const craters = [
      { x: 25, y: -30, z: 60, diameter: 20, color: "#D4A017" }, // 深橙色
      { x: -30, y: 10, z: 60, diameter: 15, color: "#D4A017" },
      { x: 0, y: -10, z: 75, diameter: 25, color: "#D4A017" },
    ];
    craters.forEach((crater) => {
      new Zdog.Ellipse({
        addTo: planet,
        diameter: crater.diameter,
        stroke: 5,
        color: crater.color,
        translate: { x: crater.x, y: crater.y, z: crater.z },
      });
    });

    // 星環
    const ring = new Zdog.Ellipse({
      addTo: this.illo,
      diameter: 200,
      stroke: 15,
      color: "#F7DC6F",
      rotate: { x: Zdog.TAU / 6 },
    });

    // 宇航員
    const astronaut = new Zdog.Group({
      addTo: ring,
      translate: { x: 100, y: 0, z: 0 },
    });

    // 宇航員頭部（頭盔）
    new Zdog.Ellipse({
      addTo: astronaut,
      diameter: 30,
      stroke: 5,
      color: "#FFF",
    });

    // 頭盔玻璃
    new Zdog.Ellipse({
      addTo: astronaut,
      diameter: 20,
      stroke: 3,
      color: "#333",
      translate: { z: 5 },
    });

    // 宇航員身體
    new Zdog.Rect({
      addTo: astronaut,
      width: 10,
      height: 15,
      stroke: 5,
      color: "#FFF",
      translate: { y: 20 },
    });

    // 手臂
    new Zdog.Rect({
      addTo: astronaut,
      width: 5,
      height: 10,
      stroke: 3,
      color: "#FF8C00",
      translate: { x: -8, y: 15 },
      rotate: { z: Zdog.TAU / 8 },
    });
    new Zdog.Rect({
      addTo: astronaut,
      width: 5,
      height: 10,
      stroke: 3,
      color: "#FF8C00",
      translate: { x: 8, y: 15 },
      rotate: { z: -Zdog.TAU / 8 },
    });

    // 腿
    new Zdog.Rect({
      addTo: astronaut,
      width: 5,
      height: 10,
      stroke: 3,
      color: "#FFF",
      translate: { x: -4, y: 30 },
    });
    new Zdog.Rect({
      addTo: astronaut,
      width: 5,
      height: 10,
      stroke: 3,
      color: "#FFF",
      translate: { x: 4, y: 30 },
    });

    // 漂浮的小星星和動物頭
    const floatingItems = [
      { type: "star", x: -150, y: -100, z: 0 },
      { type: "star", x: 120, y: 80, z: 0 },
      { type: "animal", x: -120, y: 100, z: 0 },
      { type: "animal", x: 150, y: -80, z: 0 },
      { type: "rocket", x: 200, y: 50, z: 0 },
      { type: "asteroid", x: -180, y: -120, z: -50 },
      { type: "cloud", x: 180, y: -150, z: -100 },
    ];

    floatingItems.forEach((item) => {
      const group = new Zdog.Group({
        addTo: this.illo,
        translate: { x: item.x, y: item.y, z: item.z },
      });

      if (item.type === "star") {
        new Zdog.Shape({
          addTo: group,
          path: [
            { x: 0, y: -10 },
            { x: 3, y: -3 },
            { x: 10, y: -3 },
            { x: 4, y: 2 },
            { x: 6, y: 10 },
            { x: 0, y: 5 },
            { x: -6, y: 10 },
            { x: -4, y: 2 },
            { x: -10, y: -3 },
            { x: -3, y: -3 },
          ],
          stroke: 3,
          color: "#FFF",
          fill: true,
        });
      } else if (item.type === "animal") {
        new Zdog.Ellipse({
          addTo: group,
          diameter: 20,
          stroke: 5,
          color: "#F7DC6F",
        });
        new Zdog.Ellipse({
          addTo: group,
          diameter: 3,
          stroke: 2,
          color: "#333",
          translate: { x: -5, y: 2 },
        });
        new Zdog.Ellipse({
          addTo: group,
          diameter: 3,
          stroke: 2,
          color: "#333",
          translate: { x: 5, y: 2 },
        });
        new Zdog.Hemisphere({
          addTo: group,
          diameter: 10,
          stroke: 3,
          color: "#F7DC6F",
          translate: { x: -10, y: -10, z: 5 },
          rotate: { z: Zdog.TAU / 4 },
        });
        new Zdog.Hemisphere({
          addTo: group,
          diameter: 10,
          stroke: 3,
          color: "#F7DC6F",
          translate: { x: 10, y: -10, z: 5 },
          rotate: { z: -Zdog.TAU / 4 },
        });
      } else if (item.type === "rocket") {
        // 火箭主體
        new Zdog.Rect({
          addTo: group,
          width: 10,
          height: 30,
          stroke: 5,
          color: "#FF6F61", // 珊瑚紅
          translate: { y: 0 },
        });
        // 火箭頂部（三角形）
        new Zdog.Shape({
          addTo: group,
          path: [
            { x: 0, y: -20 },
            { x: -8, y: -5 },
            { x: 8, y: -5 },
          ],
          stroke: 5,
          color: "#FF6F61",
          fill: true,
        });
        // 火箭尾部火焰
        new Zdog.Shape({
          addTo: group,
          path: [
            { x: 0, y: 20 },
            { x: -5, y: 30 },
            { x: 5, y: 30 },
          ],
          stroke: 3,
          color: "#FFD700", // 金黃色
          fill: true,
        });
        // 火箭窗戶
        new Zdog.Ellipse({
          addTo: group,
          diameter: 5,
          stroke: 2,
          color: "#333",
          translate: { y: -5 },
        });
      } else if (item.type === "asteroid") {
        // 小行星（不規則形狀）
        new Zdog.Shape({
          addTo: group,
          path: [
            { x: 0, y: -15 },
            { x: 15, y: -5 },
            { x: 10, y: 10 },
            { x: -5, y: 15 },
            { x: -15, y: 0 },
            { x: -10, y: -10 },
          ],
          stroke: 5,
          color: "#A9A9A9", // 灰色
          fill: true,
        });
        // 小行星表面細節
        new Zdog.Ellipse({
          addTo: group,
          diameter: 5,
          stroke: 2,
          color: "#808080",
          translate: { x: 5, y: -5 },
        });
        new Zdog.Ellipse({
          addTo: group,
          diameter: 3,
          stroke: 2,
          color: "#808080",
          translate: { x: -5, y: 5 },
        });
      } else if (item.type === "cloud") {
        // 雲朵（用多個圓形組合）
        new Zdog.Ellipse({
          addTo: group,
          diameter: 20,
          stroke: 5,
          color: "#B0E0E6", // 淺藍色
          translate: { x: 0, y: 0 },
        });
        new Zdog.Ellipse({
          addTo: group,
          diameter: 15,
          stroke: 5,
          color: "#B0E0E6",
          translate: { x: -10, y: -5 },
        });
        new Zdog.Ellipse({
          addTo: group,
          diameter: 15,
          stroke: 5,
          color: "#B0E0E6",
          translate: { x: 10, y: -5 },
        });
        new Zdog.Ellipse({
          addTo: group,
          diameter: 10,
          stroke: 5,
          color: "#B0E0E6",
          translate: { x: 0, y: -10 },
        });
      }
      this.floatingElements.push(group);
    });
  }

  private animate() {
    this.illo.rotate.y += 0.01;
    this.floatingElements.forEach((element, index) => {
      element.translate.y += Math.sin(Date.now() * 0.001 + index) * 0.5;
    });
    this.illo.updateRenderGraph();
    requestAnimationFrame(() => this.animate());
  }
}
