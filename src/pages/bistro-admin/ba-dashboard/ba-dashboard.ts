import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { FirebaseServiceProvider } from '../../../providers/bistro-admin/firebase-service/firebase-service';
// import { BackupFirebaseServiceProvider } from '../../../providers/bistro-admin/firebase-service/backup-firebase-service';
import { FIREBASE_PATH } from '../../../providers/bistro-admin/app-constant';

@IonicPage()
@Component({
  selector: 'page-ba-dashboard',
  templateUrl: 'ba-dashboard.html',
})
export class BaDashboardPage {
  sumaryItems = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public firebaseService: FirebaseServiceProvider) {
    this.sumaryItems = [
      {
        icon: "user",
        number: 150,
        text: "Novo Cliente"
      },
      {
        icon: "bell",
        number: 350,
        text: "Pedidos"
      },
      {
        icon: "gift",
        number: 200,
        text: "Promoções"
      },
      {
        icon: "money",
        number: 150000000,
        text: "Rendimento Total"
      }
    ]
  }

  ionViewDidLoad() {
    // this.firebaseService.getAllMapInRestaurant("bistro").then(data => {
    //   console.log("main service", data);
    //   if (data) {
    //     this.backupFirebaseService.getAllMapInRestaurant("bistro").then(backupData => {
    //       if (backupData) {
    //         for (let i = 0; i < data.length; i++) {
    //           this.firebaseService.getCollection(FIREBASE_PATH.RESTAURANT + "/bistro/maps/" + data[i].id + "/components").then(componentData => {
    //             if (componentData) {
    //               componentData.forEach(component => {
    //                 this.backupFirebaseService.addDocument(FIREBASE_PATH.RESTAURANT + "/bistro/maps/" + backupData[i].id + "/components", component);
    //               });
    //             }
    //           })
    //         }
    //       }
    //     })

    //   }
    // })
    this.drawChart();
  }

  drawChart() {
    let label = "Vendas";
    var ctx = (<HTMLCanvasElement>document.getElementById("myChart"));
    ctx.height = 200;
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ["T1", "T2", "T3", "T4", "T5", "T6"],
        datasets: [{
          label: label,
          data: [12, 190, 33, 56, 21, 300],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        title: {
          display: true,
          text: '1 mês de faturamento',
          position: "bottom"
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            },
            scaleLabel: {
              labelString: "Vendas",
              display: true
            }

          }]
        },
        tooltips: {
          callbacks: {
            label: (item) => { return label + ": " + item.yLabel + " " }
          }
        },
        scaleLabel: {
          labelString: "FUcker"
        }
      }
    });
  }

}
