import { Component, Input, ViewChild, OnInit, OnDestroy,ElementRef,OnChanges, SimpleChanges } from '@angular/core';
import { Chart, ChartDataset } from 'chart.js';
import { interval ,Subscription } from 'rxjs';

interface Floor{
  value: string;
  viewValue: string;
}
interface Section{
  value: string;
  viewValue: string;
}
interface View{
  value: string;
  viewValue: string;
}
interface Meter{
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('canvas1', {static: true}) canvasRef1!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas2', {static: true}) canvasRef2!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas3', {static: true}) canvasRef3!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas4', {static: true}) canvasRef4!: ElementRef<HTMLCanvasElement>;
  @ViewChild('canvas5', {static: true}) canvasRef5!: ElementRef<HTMLCanvasElement>;
  private ctx1!: CanvasRenderingContext2D;
  private ctx2!: CanvasRenderingContext2D;
  private ctx3!: CanvasRenderingContext2D;
  private ctx4!: CanvasRenderingContext2D;
  private ctx5!: CanvasRenderingContext2D;
  private radius: number = 50;
  private startAngle: number = 0;
  private endAngle: number = Math.PI;
  private centerX: number = 0;
  private centerY: number = 0;
  private lineWidth: number = 5;
  private minValue: number = 0;
  private maxValue: number = 100;
  private value: number = 50;
  private valueInterval!: Subscription;
  private color: string = 'green';
  private colorInterval!: Subscription;
  private intervalTime: number = 2000;
  

  floors: Floor[] = [
    {value: '1-0', viewValue: '1'},
  ];
  selectedFloor = this.floors[0].value;
  sections: Section[] = [
    {value: 'Lab 1-0', viewValue: 'Lab 1'},
  ];
  selectedSection = this.sections[0].value;
  views: View[] = [
    {value: '1-0', viewValue: 'Individual'},
  ];
  selectedView = this.views[0].value;
  meters: Meter[] = [
    {value: '1-0', viewValue: 'Meter 1'},
    {value: '1-1', viewValue: 'Meter 2'},
    {value: '1-2', viewValue: 'Meter 3'},
    {value: '1-3', viewValue: 'Meter 4'},
    {value: '1-4', viewValue: 'Meter 5'},
  ];
  selectedMeter = this.meters[0].value;
  private chart!: Chart;
  chartData: ChartDataset[] = [
    {
      label: 'Power (kW)',
      data: [0.00, 0.05, 0.10, 0.15],
      fill: false,
      borderColor: 'rgb(53,126,199)',
      tension: 0.1
    }
  ];
  private chart1!: Chart;
  chart1Data: ChartDataset[] = [
    {
      label: 'Power Factor',
      data: [0.0, 0.2, 0.4, 0.6, 0.8],
      fill: false,
      borderColor: 'rgb(53,126,199)',
      tension: 0.1
    }
  ];
 
  constructor() {
    
   }

  ngOnInit(): void {
   
  
    const canvas1 = this.canvasRef1.nativeElement;
    this.ctx1 = canvas1.getContext('2d')!;
    this.centerX = canvas1.width / 2;
    this.centerY = canvas1.height / 2;
    
    // Start drawing the semi-circle arc
    this.drawSemiCircleArc1();
    
    // Change the value of the semi-circle arc every 2 seconds
    this.valueInterval = interval(this.intervalTime).subscribe(() => {
      this.value = this.getRandomValue();
      this.drawSemiCircleArc1();
    });
    
    // Change the color of the semi-circle arc every 2 seconds
    const colors= ['green'];
    let colorIndex = 0;
    this.colorInterval = interval(this.intervalTime).subscribe(() => {
      this.color = colors[colorIndex % colors.length];
      colorIndex++;
      this.drawSemiCircleArc1();
    });
    
    const canvas2 = this.canvasRef2.nativeElement;
    this.ctx2 = canvas2.getContext('2d')!;
    this.centerX = canvas2.width / 2;
    this.centerY = canvas2.height / 2;
    
   // Start drawing the semi-circle arc
   this.drawSemiCircleArc2();
    
   // Change the value of the semi-circle arc every 2 seconds
   this.valueInterval = interval(this.intervalTime).subscribe(() => {
     this.value = this.getRandomValue();
     this.drawSemiCircleArc2();
   });
   // Change the color of the semi-circle arc every 2 seconds
   const colors1= ['green'];
   let colorIndex1 = 0;
   this.colorInterval = interval(this.intervalTime).subscribe(() => {
     this.color = colors1[colorIndex1 % colors1.length];
     colorIndex1++;
     this.drawSemiCircleArc2();
   });
   const canvas3 = this.canvasRef3.nativeElement;
    this.ctx3 = canvas3.getContext('2d')!;
    this.centerX = canvas3.width / 2;
    this.centerY = canvas3.height / 2;
    
    // Start drawing the semi-circle arc
    this.drawSemiCircleArc3();
    
    // Change the value of the semi-circle arc every 2 seconds
    this.valueInterval = interval(this.intervalTime).subscribe(() => {
      this.value = this.getRandomValue();
      this.drawSemiCircleArc3();
    });
    const canvas4 = this.canvasRef4.nativeElement;
    this.ctx4 = canvas4.getContext('2d')!;
    this.centerX = canvas4.width / 2;
    this.centerY = canvas4.height / 2;
    
    // Start drawing the semi-circle arc
    this.drawSemiCircleArc4();
    
    // Change the value of the semi-circle arc every 2 seconds
    this.valueInterval = interval(this.intervalTime).subscribe(() => {
      this.value = this.getRandomValue();
      this.drawSemiCircleArc4();
    });
    const canvas5 = this.canvasRef5.nativeElement;
    this.ctx5= canvas5.getContext('2d')!;
    this.centerX = canvas5.width / 2;
    this.centerY = canvas5.height / 2;
    
    // Start drawing the semi-circle arc
    this.drawSemiCircleArc5();
    
    // Change the value of the semi-circle arc every 2 seconds
    this.valueInterval = interval(this.intervalTime).subscribe(() => {
      this.value = this.getRandomValue();
      this.drawSemiCircleArc5();
    });
    this.chart = new Chart('myChart', {
      type: 'line',
      data: {
        labels: ['12:06:29', '12:06:39', '12:06:49', '12:06:59', '12:07:09', '12:07:19'],
        datasets: this.chartData
      },
      options: {
        responsive: false,
        animation: false
      }
    });

    setInterval(() => {
      this.chartData[0].data = this.chartData[0].data.map(() => {
        return +(Math.random() * 0.15).toFixed(2);
      });
      this.chart.update();
    }, 2000);
    this.chart1= new Chart('myChart1', {
      type: 'line',
      data: {
        labels: ['12:06:29', '12:06:39', '12:06:49', '12:06:59', '12:07:09', '12:07:19'],
        datasets: this.chart1Data
      },
      options: {
        responsive: false,
        animation: false
      }
    });

    setInterval(() => {
      this.chart1Data[0].data = this.chart1Data[0].data.map(() => {
        return +(Math.random() * 0.15).toFixed(2);
      });
      this.chart1.update();3
    }, 2000);
  }
  
  drawSemiCircleArc1() {
    this.ctx1.clearRect(0, 0, this.ctx1.canvas.width, this.ctx1.canvas.height);
    this.ctx1.beginPath();
    const angle = this.getAngleForValue(this.value);
    this.ctx1.arc(this.centerX, this.centerY, this.radius, -Math.PI, -Math.PI+ angle);
    this.ctx1.lineWidth = this.lineWidth;
    this.ctx1.strokeStyle = this.color;
    this.ctx1.stroke();
  }
  drawSemiCircleArc2() {
    this.ctx2.clearRect(0, 0, this.ctx2.canvas.width, this.ctx2.canvas.height);
    this.ctx2.beginPath();
    const angle = this.getAngleForValue(this.value);
    this.ctx2.arc(this.centerX, this.centerY, this.radius, -Math.PI, -Math.PI+ angle);
    this.ctx2.lineWidth = this.lineWidth;
    this.ctx2.strokeStyle = this.color;
    this.ctx2.stroke();
  }
  drawSemiCircleArc3() {
    this.ctx3.clearRect(0, 0, this.ctx3.canvas.width, this.ctx3.canvas.height);
    this.ctx3.beginPath();
    const angle = this.getAngleForValue(this.value);
    this.ctx3.arc(this.centerX, this.centerY, this.radius, -Math.PI, -Math.PI+ angle);
    this.ctx3.lineWidth = this.lineWidth;
    this.ctx3.strokeStyle = this.color;
    this.ctx3.stroke();
  }
  drawSemiCircleArc4() {
    this.ctx4.clearRect(0, 0, this.ctx4.canvas.width, this.ctx4.canvas.height);
    this.ctx4.beginPath();
    const angle = this.getAngleForValue(this.value);
    this.ctx4.arc(this.centerX, this.centerY, this.radius, -Math.PI, -Math.PI+ angle);
    this.ctx4.lineWidth = this.lineWidth;
    this.ctx4.strokeStyle = this.color;
    this.ctx4.stroke();
  }
  drawSemiCircleArc5() {
    this.ctx5.clearRect(0, 0, this.ctx5.canvas.width, this.ctx5.canvas.height);
    this.ctx5.beginPath();
    const angle = this.getAngleForValue(this.value);
    this.ctx5.arc(this.centerX, this.centerY, this.radius, -Math.PI, -Math.PI+ angle);
    this.ctx5.lineWidth = this.lineWidth;
    this.ctx5.strokeStyle = this.color;
    this.ctx5.stroke();
  }
  
  
  private getRandomValue(): number {
    return Math.floor(Math.random() * (this.maxValue - this.minValue + 1) + this.minValue);
  }
  
  private getAngleForValue(value: number): number {
    const percentage = value / (this.maxValue - this.minValue);
    const angle = percentage * Math.PI;
    return angle;
  }
  
}



    


