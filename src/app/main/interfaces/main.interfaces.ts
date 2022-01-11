export interface Finca {
    id:          number;
    nombreFinca: string;
    vereda:      string;
    posicion:    Posicion;
    criterios:   CriterioFinca[];
    cultivos:    Cultivo[];
}

export interface Cultivo {
    id:          number;
    finca:       number;
    tipoCultivo: TipoCultivo;
    fechaInicio: Date;
}

export interface TipoCultivo {
    id:          number;
    tipoCultivo: string;
}

export interface CriterioFinca {
    criterio:       Criterio;
    ficheroSoporte: string;
    linkSoporte:    string;
    fechaRegistro:  string;
    fechaCaduca:    string;
    aprobado:       boolean;
}

export interface Criterio {
    numero:        string;
    textoCriterio: string;
    nivelCriterio: number;
}

export interface Posicion {
    longitud: string;
    latitud:  string;
    altura:   number;
}

export interface Planta {
    id:            number;
    cultivo:       number;
    generacion:    number;
    linea:         number;
    consecutivo:   number;
    fechaSiembra:  Date;
    posicion:      Posicion;
    estadosPlanta: EstadosPlanta[];
    marcador?:     mapboxgl.Marker;
}

export interface EstadosPlanta {
    estadoPlanta: EstadoPlanta;
    empleado:     Empleado;
    fecha:        Date;
    observacion:  string;
}

export interface Empleado {
    finca:         number;
    persona:       Persona;
    fechaContrato: Date;
    activo:        boolean;
}

export interface Persona {
    nuid:      string;
    usuario:   Usuario;
    direccion: string;
    telefono:  string;
}

export interface Usuario {
    first_name: string;
    last_name:  string;
    username:   string;
    email:      string;
    groups:     string[];
}

export interface EstadoPlanta {
    etiqueta: string;
    icono:    string;
    nivel:    number;
}

export interface Tarea {
    tareaPlantilla: TareaPlantilla;
    fechaInicial:   Date;
    fechaFinal:     null;
    observacion:    null;
    plantas:        number[];
}

export interface TareaPlantilla {
    tareaPlantilla: string;
    descripcion:    string;
}
