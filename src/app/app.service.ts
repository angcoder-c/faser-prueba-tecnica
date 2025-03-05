import { Injectable } from '@angular/core';
import { Tarea } from './tarea';

@Injectable()
export class AppService { 
    constructor(
        
    ) { }

    public async obtenerTareas() {
        try {
            // buscar en el localstorage
            let tareasGuardadas = localStorage.getItem('tareas')
            if (tareasGuardadas) {
                return JSON.parse(tareasGuardadas)
            } else {
                // si no, usar las tareas por defecto
                var tareas: Tarea[] = [];
                tareas.push(new Tarea(1, 'Sacar a pasear al perro', 15));
                tareas.push(new Tarea(2, 'Sacar la basura', 5));
                tareas.push(new Tarea(3, 'Cocinar la cena', 30));
                tareas.push(new Tarea(4, 'Lavar la ropa', 50));
                tareas.push(new Tarea(5, 'Regar las plantas', 20));
                return tareas;
            }
        } catch (error) {
            return null;
        }
    }

    public guardarTareas (tareas : Tarea[]) {
        // guardar array de tareas actualizado en el localstorage
        localStorage.setItem("tareas", JSON.stringify(tareas))
    }
}