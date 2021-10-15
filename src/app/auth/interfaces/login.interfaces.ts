export interface Usuario {
    username: string;
    password: string;
}
export interface RespuestaLogin {
    token: string | undefined;
    non_field_errors: string[] | undefined;
}