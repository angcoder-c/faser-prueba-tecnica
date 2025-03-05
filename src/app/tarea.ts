export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        // propuedad: seleccionado 
        public seleccionado : boolean = false
    ){}
}

// funcion de ordenamiento Props
export type ordenamientoProps = 
 | { prop : 'id' }
 | { prop : 'titulo' }
 | { prop : 'minutos' }