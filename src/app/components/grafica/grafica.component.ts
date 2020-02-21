import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0], label: 'Ventas' },
  ];
  public lineChartLabels: Label[] = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
  ];
  public lineChartType = 'line';
  constructor(
      // Importamos HttpClientModule
      private http: HttpClient,
      // Ocuparemos el servicio
      public wsService:WebsocketService
  ) {}

  ngOnInit() {
    // Cada 3 segundo estaremos ejecutando un callback


    this.getData();

    this.escucharSocket();

    // setInterval(()=>{
      
    //   const newData = [
    //     Math.round (Math.random() * 100 ),
    //     Math.round(Math.random() * 100),
    //     Math.round(Math.random() * 100),
    //     Math.round(Math.random() * 100),
    //   ];

    //   this.lineChartData = [
    //     {data:newData, label:'Ventas'}
    //   ];
      
    // },3000)
  }


  getData(){
      this.http.get('http://localhost:5000/grafica')
      .subscribe( (data:any) => this.lineChartData = data);
  }
  
  // Metodo de escuha cuando el servidor emita cambio-grafica
  escucharSocket(){
    // voy a usar el wsSocketService
    this.wsService.listen('cambio-grafica')
    .subscribe( (data:any)=>{
      console.log('socket',data);
      this.lineChartData = data;
    }); // va a regresar un obs
  }
}
