import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('myCanvas')
  myCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('img')
  img: ElementRef;

  public context: CanvasRenderingContext2D;
  public imgElement: HTMLImageElement;

  xPosition = 0;
  yPosition = 0;
  imageWidth = 0;
  imageHeight = 0;
  src = 'assets/bell.png';
  imageSrcList = ['assets/bell.png', 'assets/seven.png', 'assets/star.png', 'assets/watermelon.png']
  canvasWidth = 300;
  canvasHeight = 300;
  isStop = false;
  isFistAction = true;
  seletedItem = '';


  ngAfterViewInit(): void {
    this.context = this.myCanvas.nativeElement.getContext('2d');
    this.imgElement = this.img.nativeElement;

    // 圖片大小
    this.imageWidth = this.canvasWidth * 0.8;
    this.imageHeight = this.canvasHeight * 0.8;

    // 置中
    this.xPosition = (this.canvasWidth / 2) - (this.imageWidth / 2);
    this.yPosition = (this.canvasHeight / 2) - (this.imageHeight / 2);

    this.renderImage();
  }

  public start() {
    this.isStop = false;
    if (this.isFistAction) {
      this.animate();
      this.isFistAction = false;
    }

  }

  public stop() {
    this.isStop = true;
  }

  draw() {
    this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    // for (var i = 0; i < this.circles.length; i++) {
    //   var c = this.circles[i];
    //   this.context.beginPath();
    //   this.context.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
    //   this.context.closePath();
    //   this.context.fill();
    //   this.context.stroke();
    // }
    // var c = this.circles[1]
    // this.context.font = 'italic 18px Arial';
    // this.context.textAlign = 'center';
    // this.context.textBaseline = 'middle';
    // this.context.fillStyle = 'red';
    // this.context.fillText('Hello!', c.x, c.y);
    this.renderImage();

  }

  afterLoading() {
    this.renderImage();

  }


  private renderImage() {
    this.context.drawImage(this.imgElement, this.xPosition, this.yPosition, this.imageWidth, this.imageHeight);
  }

  number = 0;

  animate() {
    window.requestAnimationFrame(() => this.animate());

    if (this.isStop) {
      // 圖形過半
      if (this.yPosition > this.canvasHeight / 2 - this.imageHeight / 2) {
        this.yPosition += 30;
        // 超過還是要多加一個
        if (this.yPosition > 350) {
          const index = this.getRandomInt(0, 3);
          this.src = this.imageSrcList[index];
          this.yPosition = - this.imageHeight;
        }
        // 未過半
      } else if (this.yPosition < this.canvasHeight / 2 - this.imageHeight / 2) {
        this.yPosition += 5;
      } else {
        if (this.seletedItem === '') {
          this.seletedItem = this.src;
          console.log(`得到${this.seletedItem}`);
        }
      }
      this.draw();
      return;
    }

    //取消選到的東西
    this.seletedItem = '';
    if (this.yPosition < 350) {
      this.yPosition += 30;
    } else {
      const index = this.getRandomInt(0, 3);
      this.src = this.imageSrcList[index];
      this.yPosition = - this.imageHeight;
    }
    this.draw();
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
