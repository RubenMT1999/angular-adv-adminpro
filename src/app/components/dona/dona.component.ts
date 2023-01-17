import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData, ChartEvent, ChartType, Color } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input() titulo: string = 'Sin título';
  @Input() valores: number[] = [100,100,100];
  @Input('labels')  public doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];


//sino no coge el valor de los inputs porque parece que carga antes la gráfica.
  ngOnChanges(changes: SimpleChanges): void{
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets:[{ data: this.valores, backgroundColor: ['#9E120E','#FF5800','#FFB414'] }]
    }
  }


  // Doughnut
  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: []
  };
    
  public doughnutChartType: ChartType = 'doughnut';

}
