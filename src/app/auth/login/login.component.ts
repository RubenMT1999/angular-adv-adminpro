import { Router } from '@angular/router';
import { Component,AfterViewInit, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit{

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;

  public loginForm:FormGroup = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    remember: [false]
  });


  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone){}


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "654622771453-jf22r6uopircg7fe0221dsd6kbjn5k60.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      //document.getElementById("buttonDiv"),
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response:any){
      //console.log("Encoded JWT ID token: " + response.credential);
      this.usuarioService.loginGoogle(response.credential)
          .subscribe(resp => {
            // console.log({login: resp})
            this.ngZone.run( () => {this.router.navigateByUrl('/');}) 
          })
  }


  login(){
    this.usuarioService.login(this.loginForm.value)
    .subscribe(
      {
        next: resp => {
          if(this.loginForm.get('remember')!.value){
            localStorage.setItem('email', this.loginForm.get('email')!.value)
          }else{
            localStorage.removeItem('email')
          }
          this.router.navigateByUrl('/');
          
        },
        error: (err) =>{Swal.fire('Error', err.error.msg, 'error')}
      }
    )
  }


}
