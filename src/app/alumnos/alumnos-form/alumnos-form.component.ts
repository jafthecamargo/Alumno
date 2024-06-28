import {Component, OnInit} from '@angular/core';
import {Alumno} from "../../model/Alumno";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {InputNumberModule} from "primeng/inputnumber";
import {AlumnoService} from "../../service/alumno.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import Swal from 'sweetalert2';
import {SplitButtonModule} from "primeng/splitbutton";
import {ButtonGroupModule} from "primeng/buttongroup";

@Component({
  selector: 'app-alumnos-form',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule, InputNumberModule, SplitButtonModule, ButtonGroupModule, HttpClientModule],
  templateUrl: './alumnos-form.component.html',
  styleUrl: './alumnos-form.component.css'
})
export class AlumnosFormComponent implements OnInit {
  alumno : Alumno = new Alumno();

  ngOnInit(): void {
    this.mostrarAlumno()
  }

  constructor(private http: HttpClient,
              private alumnoService: AlumnoService,
              private router: Router,
              private activateRouter: ActivatedRoute
  ) { }

  registrarAlumno(): void {
    this.alumnoService.crearAlumno(this.http, this.alumno)
      .subscribe(
        (elAlumno) => {
          Swal.fire({
            title: 'Registrando al alumno',
            text: `El alumno ${this.alumno.nombreAlumno} se registró correctamente`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/alumnos']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al registrar el alumno: ${error.message}`,
            icon: 'error'
          });
        }
      );
  }

  actualizarAlumno(): void {
    this.alumnoService.actualizarAlumno(this.http, this.alumno)
      .subscribe(
        (laCategoria) => {
          Swal.fire({
            title: 'Actualizando al alumno',
            text: `El alumno se actualizó correctamente`,
            icon: 'success'
          }).then(() => {
            this.router.navigate(['/alumnos']);
          });
        },
        (error) => {
          Swal.fire({
            title: 'Error',
            text: `Hubo un error al actualizar el alumno: ${error.message}`,
            icon: 'error'
          });
        }
      );
  }

  mostrarAlumno() {
    this.activateRouter.params
      .subscribe(
        (params) => {
          let id = params['id'];
          if (id) {
            this.alumnoService.mostrarAlumno(this.http, id)
              .subscribe(
                (elAlumno) => (this.alumno = elAlumno)
              );
          }
        }
      );
  }
}
