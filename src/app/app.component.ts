import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';
import { ordenamientoProps } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	ascendente = true

	constructor(
        public service: AppService,
	) {
	 }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}

	// tarea 1
	nuevaTarea (titulo : string, minutos : number) {
		// nueva tarea
		this.tareas.push({
			id : this.tareas.length+1,
			titulo : titulo,
			minutos : minutos,
			seleccionado : false,
			destacado : false
		})

		// actualizar local storage
		this.service.guardarTareas(this.tareas)
	}

	// tarea 3
	actualizarEstadoChecked (event : any, id : number) {
		let seleccionado = event.target.checked
		this.tareas.map(tarea => {
			// si el id coincide y está seleccionado se actualiza el estado
			if (tarea.id === id && seleccionado) {
				tarea.seleccionado = seleccionado
			}

			return tarea
		})

		this.service.guardarTareas(this.tareas)
	}

	seleccionarTodo(event : any){
		// estado seleccionado
		let seleccionado = event.target.checked

		// cambiar el estado seleccionado de todos los elementos
		this.tareas.forEach(tarea => {
			tarea.seleccionado = seleccionado;
		});
		this.service.guardarTareas(this.tareas)
	}

	isSeleccionados () {
		return this.tareas.every(tarea=>tarea.seleccionado)
	}

	// tarea 4
	// eliminar tareas seleccionadas
	eliminarSeleccionados () {
		this.tareas = this.tareas.filter(tarea=>!tarea.seleccionado)
		this.service.guardarTareas(this.tareas)
	}

	// tarea 5
	// ordenar ascendente o descendente al dar click en los encabezados
	ordenar ({prop} : ordenamientoProps) {
		// cambia el estado con cada click
		this.ascendente = !this.ascendente
		this.tareas
		.sort((a, b) => {
			if (a[prop] > b[prop]) {
				return this.ascendente ? -1 : 1
			}

			if (a[prop] < b[prop]) {
				return this.ascendente ? 1 : -1
			}
			return 0
		})
	}

	// tarea 6
	// destacados con estilos
	seleccionarDestacados () {
		this.tareas = this.tareas.map(tarea => {
			// solo se destaca si está seleccionado
			if (tarea.seleccionado) {
				tarea.destacado = true
			} else {
				tarea.destacado = false
			}
			return tarea
		})
		this.service.guardarTareas(this.tareas)
	}

	// tarea 7
	// ordenar todas las tareas de forma aleatoria
	ordenAleatorio () {
		this.tareas = [...this.tareas].sort(()=>0.5-Math.random())
		this.service.guardarTareas(this.tareas)
	}
}
