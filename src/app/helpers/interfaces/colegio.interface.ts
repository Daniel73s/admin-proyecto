export interface Colegio {
    id_colegio?: string,
    rue: number,
    nombre: string,
    estudiantes: number,
    dependencia: string,
    nivel: string[],
    estado?: boolean,
    fecha_creacion?: Date,
    fecha_modificacion?: Date,
    ubicacion: Ubicacion_colegio,
    contacto:Contacto_colegio
}

interface Ubicacion_colegio {
    id_direccion?: number,
    id_colegio?:string,
    calle: string,
    numero?: string,
    ciudad: string,
    zona?: string,
    area_geografica: 'RURAL' | 'URBANO',
    latitud: string,
    longitud: string
}
 interface Contacto_colegio{
    id_colegio?:string,
    id_contacto?:number,
	tel_fijo:string,
	num_celular:string,
	email:string
 }