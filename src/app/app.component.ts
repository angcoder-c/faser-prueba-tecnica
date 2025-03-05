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

	nuevaTarea (titulo : string, minutos : number) {
		// nueva tarea
		this.tareas.push({
			id : this.tareas.length+1,
			titulo : titulo,
			minutos : minutos
		})

		// actualizar local storage
		this.service.guardarTareas(this.tareas)
	}
}
