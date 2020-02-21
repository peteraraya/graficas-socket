import { Component, OnInit } from '@angular/core';
import { ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {
  public barChartType: ChartType = 'bar';
  public barChartLabels: Label[] = ['Pregunta 1', 'Pregunta 2', 'Pregunta 3', 'Pregunta 4'];
  public barChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Entrevistados' },
  ];
  constructor(
    private http: HttpClient,
    private wsService: WebsocketService
  ) { }

  ngOnInit() {
    this.getDatosEncuesta();
    this.escuchaEncuesta();
  }

  getDatosEncuesta(){
    this.http.get('http://localhost:5000/encuesta')
      .subscribe((data: any) => this.barChartData = data);
  }
  escuchaEncuesta(){
    // voy a usar el wsSocketService
    this.wsService.listen('cambio-encuesta')
      .subscribe((data: any) => {
        console.log('socket', data);
        this.barChartData = data;
      }); // va a regresar un obs
  }

}
