import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { registro } from "../dto/data";

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  formGroup: FormGroup;
  formGroupDetail: FormGroup;
  flag:boolean =true;
  num1:any;
  num2:any;
  num3:any;
  num4:any;
  datos: any = {};
  data = new registro;
  json=[
    {
    "n1":0,
    "n2":0,
    "n3":0,
    "n4":0
    }
  ];

  constructor(private formBuilder: FormBuilder) {
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
  ngOnInit() {}

  sen(){
    if (this.flag) {
      this.json[0] = {"n1": this.num1,"n2": this.num2, "n3":this.num3, "n4": this.num4};
      this.flag = false;
    }else{
      this.json.push({"n1": this.num1,"n2": this.num2, "n3":this.num3, "n4": this.num4})
    }
    this.datos.get('num1').setValue(0); 
    this.datos.get('num2').setValue(0); 
    this.datos.get('num3').setValue(0); 
    this.datos.get('num4').setValue(0); 
    console.log(this.json);
  }
}
