import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { registro } from "../dto/data";
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  formGroup: FormGroup;
  formGroupDetail: FormGroup;
  flag: boolean = true;
  numeroAleatorio1: number;
  numeroAleatorio2: number;
  numeroAleatorio3: number;
  numeroAleatorio4: number;
  num1: any;
  num2: any;
  num3: any;
  num4: any;
  datos: any = {};
  data = new registro;
  iterador: number = 1;
  numeroAleatorioCompleto: any;
  numeroCompleto: any;
  disableButton: boolean = false;
  json = [
    {
      "iteracion": 0,
      "numero": 0,
      "pica": 0,
      "fija": 0
    }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.datos = formBuilder.group({
      num1: new FormControl("", { validators: Validators.required, updateOn: 'blur' }),
      num2: new FormControl("", { validators: Validators.required, updateOn: 'blur' }),
      num3: new FormControl("", { validators: Validators.required, updateOn: 'blur' }),
      num4: new FormControl("", { validators: Validators.required, updateOn: 'blur' })
    }, { updateOn: 'change' });
    this.datos.valueChanges.subscribe(datos => {
      this.num1 = this.datos.get('num1').value;
      this.num2 = this.datos.get('num2').value;
      this.num3 = this.datos.get('num3').value;
      this.num4 = this.datos.get('num4').value;
    });
  }
  ngOnInit() {
    this.asignacionDeNumeros();
    console.log(this.numeroAleatorio1, this.numeroAleatorio2, this.numeroAleatorio3, this.numeroAleatorio4);

    this.numeroAleatorioCompleto = `${this.numeroAleatorio1}${this.numeroAleatorio2}${this.numeroAleatorio3}${this.numeroAleatorio4}`
  }

  sen() {
    let picas: number;
    let fijas: number;
    this.numeroCompleto = `${this.num1}${this.num2}${this.num3}${this.num4}`;
    fijas = this.fijas(this.num1, this.num2, this.num3, this.num4);
    picas = (this.picas(this.num1, this.num2, this.num3, this.num4))-fijas;
    if (this.num1 == undefined && this.num2 == undefined && this.num3 == undefined && this.num4 == undefined) {
      this.numeroCompleto = "0000"
    }
    if (!this.disableButton) {
      if (this.flag) {
        this.json[0] = { "iteracion": this.iterador, "numero": this.numeroCompleto, "pica": picas, "fija": fijas };
        this.flag = false;
        this.iterador++;
      } else {
        this.json.push({ "iteracion": this.iterador, "numero": this.numeroCompleto, "pica": picas, "fija": fijas });
        this.iterador++;
      }
    }
    this.datos.get('num1').setValue(0);
    this.datos.get('num2').setValue(0);
    this.datos.get('num3').setValue(0);
    this.datos.get('num4').setValue(0);
    if (fijas == 4) {
      swal.fire({
        title: `Ganaste!`,
        text: `Bien echo el numero era: ${this.numeroAleatorioCompleto}`,
        width: 600,
        padding: '3em',
        background: '#fff',
        showCancelButton: true,
        confirmButtonText: 'Volver a Jugar',
        cancelButtonText: 'Ver Tabla',
      }).then((result) => {
        if (result.value) {
          location.reload();
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) { }
      })
      document.getElementById('enviar').setAttribute("onclick", "disabled");
      this.disableButton = true;
    }
    if (this.iterador >= 11) {
      swal.fire({
        title: `Perdiste!`,
        text: `Que mal el numero era: ${this.numeroAleatorioCompleto}`,
        width: 600,
        padding: '3em',
        background: '#fff',
        showCancelButton: true,
        confirmButtonText: 'Volver a Jugar',
        cancelButtonText: 'Ver Tabla',
      }).then((result) => {
        if (result.value) {
          location.reload();
        } else if (
          result.dismiss === swal.DismissReason.cancel
        ) { }
      })
    }
    console.log(this.json);
  }
  fijas(n1: number, n2: number, n3: number, n4: number): number {
    let fijasCount: number = 0;
    this.numeroAleatorio1 == n1 ? fijasCount++ : false;
    this.numeroAleatorio2 == n2 ? fijasCount++ : false;
    this.numeroAleatorio3 == n3 ? fijasCount++ : false;
    this.numeroAleatorio4 == n4 ? fijasCount++ : false;
    return fijasCount;
  }
  picas(n1: number, n2: number, n3: number, n4: number) {
    let picasCount: number = 0
    if (n1 == this.numeroAleatorio1 || n1 == this.numeroAleatorio2 || n1 == this.numeroAleatorio3 || n1 == this.numeroAleatorio4) {
      picasCount++;
    }
    if (n2 == this.numeroAleatorio1 || n2 == this.numeroAleatorio2 || n2 == this.numeroAleatorio3 || n2 == this.numeroAleatorio4) {
      picasCount++;
    }
    if (n3 == this.numeroAleatorio1 || n3 == this.numeroAleatorio2 || n3 == this.numeroAleatorio3 || n3 == this.numeroAleatorio4) {
      picasCount++;
    }
    if (n4 == this.numeroAleatorio1 || n4 == this.numeroAleatorio2 || n4 == this.numeroAleatorio3 || n4 == this.numeroAleatorio4) {
      picasCount++;
    }
    return picasCount;
  }
  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  asignacionDeNumeros() {
    let numGenerado: number;
    let numGeneradoAux: number;

    this.numeroAleatorio1 = this.getRandomArbitrary(0, 10);

    do {
      let generador = this.getRandomArbitrary(0, 10);
      if (generador != this.numeroAleatorio1) {
        this.numeroAleatorio2 = generador;
      }
    } while (this.numeroAleatorio2 == this.numeroAleatorio1 || this.numeroAleatorio2 == undefined);

    do {
      let generador = this.getRandomArbitrary(0, 10);
      if (generador != this.numeroAleatorio1 && generador != this.numeroAleatorio2) {
        this.numeroAleatorio3 = generador;
      }
    } while (this.numeroAleatorio3 == this.numeroAleatorio2 || this.numeroAleatorio3 == this.numeroAleatorio1 || this.numeroAleatorio3 == undefined);

    do {
      let generador = this.getRandomArbitrary(0, 10);
      if (generador != this.numeroAleatorio1 && generador != this.numeroAleatorio2 && generador != this.numeroAleatorio3) {
        this.numeroAleatorio4 = generador;
      }
    } while (this.numeroAleatorio4 == this.numeroAleatorio1 || this.numeroAleatorio4 == this.numeroAleatorio2 || this.numeroAleatorio4 == this.numeroAleatorio3 || this.numeroAleatorio4 == undefined);

    if (this.numeroAleatorio1 == null || this.numeroAleatorio2 == null || this.numeroAleatorio3 == null || this.numeroAleatorio4 == null) {
      swal.fire({
        icon: 'error',
        title: 'Oops... Error 204 No Content',
        text: 'Nosotros lo arreglamos recarga la pagina de nuevo'
      })
      this.asignacionDeNumeros();
    }

  }
}
