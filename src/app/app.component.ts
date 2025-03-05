import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];

	constructor(
        public service: AppService,
	) { }
	
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
			seleccionado : false
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
}
