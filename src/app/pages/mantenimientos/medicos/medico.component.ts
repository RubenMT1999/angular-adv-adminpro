import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit{

  public medicoForm: FormGroup;
  public hospitales: Hospital[];

  public hospitalSeleccionado: Hospital;
  public medicoSeleccionado: Medico;

  constructor(private fb: FormBuilder,
              private hospitalService: HospitalService,
              private medicoService: MedicoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){}

  ngOnInit(): void {

    //obtener medico seleccionado a traves del id de la url
    this.activatedRoute.params.subscribe( ({id}) => {
      this.cargarMedico(id);
    })


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required]
    })

    this.cargarHospitales();

    //obtener hospital de la lista desplegable
    this.medicoForm.get('hospital')?.valueChanges.pipe(delay(100))
        .subscribe(hospitalId => {
          this.hospitalSeleccionado = this.hospitales.find(h => h._id === hospitalId)!;
        })
    
        console.log(this.hospitalSeleccionado)

  }


  cargarMedico(id: string){

    if(id === 'nuevo'){
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
      .pipe(delay(100))
      .subscribe(medico => {
        const { nombre, hospital: { _id } = {} as any } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: _id });
      }, error => {
        return this.router.navigateByUrl(`/dashboard/medicos`);
      });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe((hospitales: Hospital[] )=> {
        this.hospitales = hospitales;
      })
  }

  guardarMedico(){
    const {nombre} = this.medicoForm.value;

    if(this.medicoSeleccionado){
      //actualizar
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      this.medicoService.actualizarMedico(data)
          .subscribe(resp =>{
            console.log("actualizado: "+ resp)
            Swal.fire('Actualizado',`${nombre} actualizado correctamente`, 'success');
          })
    }else{
      //crear
      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp:any) => {
          Swal.fire('Creado',`${nombre} creado correctamente`, 'success');
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        })
    }
  }


}
