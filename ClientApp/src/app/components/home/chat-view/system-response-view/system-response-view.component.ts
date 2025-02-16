import {
  Component,
  ViewChild,
  AfterViewInit,
  OnInit,
  Input,
  ElementRef,
  PLATFORM_ID,
  Inject,
  HostListener,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexResponsive,
} from 'ng-apexcharts';
import { isPlatformBrowser } from '@angular/common';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
};

@Component({
  selector: 'app-system-response-view',
  imports: [],
  templateUrl: './system-response-view.component.html',
  styleUrl: './system-response-view.component.scss'
})
export class SystemResponseViewComponent implements AfterViewInit, OnInit {
  @ViewChild('chartObj') chart: ChartComponent;
  @ViewChild('chartContainer') chartContainer: ElementRef | undefined;
  @ViewChild('styledContainer') styledContainer: ElementRef | undefined;
  @Input() res: any;
  @Input() config: any;
  screenSize: number = 0;
  lableList: any[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.calcScreanWidth();
  }

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngAfterViewInit(): Promise<void> {
    if (
      isPlatformBrowser(this.platformId) &&
      this.chartContainer &&
      this.phaseData(this.res, 'chart') !== null
    ) {
      const ApexCharts = (await import('apexcharts')).default;
      const chart = new ApexCharts(
        this.chartContainer.nativeElement,
        this.getChartOptions(this.phaseData(this.res, 'chart'))
      );
      chart.render();
    }
  }

  ngOnInit(): void {
    this.calcScreanWidth();
  }

  calcScreanWidth(): void {
    this.screenSize = window.innerWidth;
  }

  getChartOptions(data: any): Partial<ChartOptions> {
    let options: ChartOptions = {
      series: data.series,
      chart: {
        height: this.screenSize > 640 ? 650 : 425,
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      stroke: {
        width: 0,
      },
      fill: {
        opacity: 0.4,
      },
      markers: {
        size: 0,
      },
      title: {
        text: 'Detailed Chart',
      },
      xaxis: {
        categories: this.generateCategories(data.categories),
      },
      yaxis: {
        min: 0,
        max: 5,
        tickAmount: 5,
        labels: {
          formatter: (val: number) => val.toString(),
        },
      },
    };

    return options;
  }

  phaseData(data: any, action: string): any {
    try {
      let phasedData: any = JSON.parse(data);
      return phasedData[action];
    } catch (e: any) {
      return null;
    }
  }

  toDecimalPoints(value: any, points: number = 0): number {
    return Number(value.toFixed(points));
  }

  textToHtmlText(text: string): SafeHtml {
    let html: any = `<div class="html_doc">${text
      .replace(/```html <body> /g, '')
      .replace(/<\/body> ```/g, '')
      .replace(/<body>/g, '')
      .replace(/<\/body>/g, '')
      .replace(/```html/g, '')
      .replace(/```/g, '')}</div>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  generateCategories(arr: string[]): string[] {
    if (this.screenSize > 640) {
      this.lableList = [];
      return arr;
    } else {
      let shorts: string[] = [];
      let genArr: any[] = [];

      arr.forEach((text: string) => {
        let short: string = text
          .split(/[ /]+/)
          .map((word) => word.charAt(0).toUpperCase())
          .join('');
        if (!shorts.includes(short)) {
          shorts.push(short);
          genArr.push({ short, text });
        } else {
          let i: number = 0;
          while (i < 0) {
            let regenShort: string = `${short}${i}`;
            if (!shorts.includes(short)) {
              shorts.push(regenShort);
              genArr.push({ short: regenShort, text: text });
              break;
            }
            ++i;
          }
        }
      });

      this.lableList = genArr;
      return shorts;
    }
  }
}
