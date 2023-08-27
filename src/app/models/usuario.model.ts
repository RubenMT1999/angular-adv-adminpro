import { environment } from "src/environments/environment"

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public uid?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public google?:boolean,
    ){}

    get imagenUrl(){

        if(!this.img){
            return `${base_url}/upload/usuarios/no-image`
        //si la imagen proviene de google https
        }else if(this.img?.includes('https')){
            return this.img;
        }else if(this.img){
            return `${base_url}/upload/usuarios/${this.img}`;
        }else{
            return `${base_url}/upload/usuarios/no-image`
        }
        

       
        
    }
}