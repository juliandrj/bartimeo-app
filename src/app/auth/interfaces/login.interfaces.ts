export interface Credenciales {
    username: string;
    password: string;
}
export interface RespuestaLogin {
    token: string | undefined;
    non_field_errors: string[] | undefined;
}

export interface Usuario {
    pk: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}