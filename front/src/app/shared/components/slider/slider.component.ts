import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {NgbCarousel, NgbSlideEvent, NgbSlideEventSource} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {

  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  slides = [
    {
      image: `https://img4.goodfon.ru/wallpaper/nbig/b/19/velikobritaniia-biddulph-grange-garden-sad-prud-dorozhka-gaz.jpg`,
      link: '/catalog/seeds/flowers',
      title: 'Широкий выбор цветов'
    },
    {
      image: `https://selhozproduct.ru/upload/usl/f_60ae88d828437.jpg`,
      link: '/catalog/seeds/vegetables',
      title: 'Широкий выбор овощей'
    },
    {
      image: `https://alt.selhozproduct.ru/upload/usl/f_60817a9bd00d9.jpg`,
      link: '/catalog/agrochemistry',
      title: 'Широкий выбор агрохимии'
    }]

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static: true}) carousel: NgbCarousel | undefined;

  togglePaused() {
    if (this.paused) {
      this.carousel!.cycle();
    } else {
      this.carousel!.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
