import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../model/Alumno';
import { TableModule } from "primeng/table";
import { AlumnoService } from "../../service/alumno.service";
import { CommonModule } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {ButtonModule} from "primeng/button";
import {RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {ButtonGroupModule} from "primeng/buttongroup";

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [TableModule, CommonModule, HttpClientModule, ButtonModule, RouterLink, ButtonGroupModule],
  templateUrl: './alumnos.component.html',
  styleUrl: './alumnos.component.css'
})
export class AlumnosComponent implements OnInit {
  titulo : string = 'Lista de Alumnos';
  listadoDeAlumnos : Alumno[] = []

  constructor(private http: HttpClient, private alumnoService: AlumnoService) { }

  ngOnInit(): void {
    this.alumnoService
      .mostrarAlumnos(this.http)
      .subscribe((losAlumnos) => this.listadoDeAlumnos = losAlumnos);
  }

  delete(alumno: Alumno): void {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.alumnoService.eliminarAlumno(this.http, alumno.idAlumno)
          .subscribe(
            (response) => {
              this.alumnoService.mostrarAlumnos(this.http)
                .subscribe(
                  (losAlumnos) => {
                    this.listadoDeAlumnos = losAlumnos;
                    Swal.fire({
                      title: "¡Eliminado!",
                      text: "El registro ha sido eliminado satisfactoriamente.",
                      icon: "success"
                    });
                  }
                );
            },
            (error) => {
              Swal.fire({
                title: "Error",
                text: `Hubo un error al eliminar la categoría: ${error.message}`,
                icon: "error"
              });
            }
          );
      }
    });
  }
}
