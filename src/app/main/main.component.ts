import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbThemeService, NbToastrService } from '@nebular/theme';

interface Info {
  nomEstado: string;
  leer: string;
  escribir: string;
  mov: string;
  estadoSig: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

// Realizado por Brayan Barrera 20201678030, Diego Martinez 20201678038, Laura Diaz 20201678047
  public entrada;
  public estados;
  public bolEstado = false;
  public bolRes = false;
  public posicion;
  public bolInfo = false;
  public listEstados: Array<Info>;
  public listResult = [];

  constructor(private toastr: NbToastrService,) {
  }
  ngOnInit(): void {

  }

  validarEntrada() {
    if (this.entrada) {
      this.bolEstado = true;
    } else {
      this.toastr.warning('Digite una entrada', 'Error')
    }
  }

  validarEstados() {
    if (this.estados > 0) {
      this.listEstados = [];
      for (let i = 0; i < this.estados; i++) {
        this.listEstados.push({
          nomEstado: '',
          leer: '',
          escribir: '',
          mov: '',
          estadoSig: ''
        });
      }
      this.bolInfo = true;
    }
  }

  ejecutar() {
    this.bolRes = true;
    let band = true;
    this.posicion = 0;
    let pos2 = 0;
    this.listResult = [];
    console.log(this.listEstados);
    let aux = this.entrada.split('');
    this.listResult.push(aux.toString());
    while (band) {
      if (this.listEstados[pos2].leer == aux[this.posicion]) {
        aux[this.posicion] = this.listEstados[pos2].escribir;
        this.listResult.push(aux.toString());
        let next = this.listEstados.findIndex(v => v.nomEstado == this.listEstados[pos2].estadoSig);
        if (next >= 0) {
          switch (this.listEstados[pos2].mov) {
            case 'r':
              this.posicion++;
              if (this.posicion >= aux.length) {
                aux.push('_');
              }
              break;

            case 'l':
              this.posicion--;
              if (this.posicion <= 0) {
                aux = ['_'].concat(aux);
                this.posicion = 0
              }
              break;
            case '*':

              break;
            default:
              break;
          }
          pos2 = next;
        } else {
          band = false;
        }

      } else {
        band = false;
      }

    }


    console.log(this.listResult);

  }

}
