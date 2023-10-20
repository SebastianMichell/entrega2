import { Component,ElementRef,ViewChild} from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { IonTitle,AnimationController, IonModal} from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import { AutenticacionService } from '../servicios/autenticacion.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;
  public alertButtons = ['OK'];
  public alertInputs = [
    {
      placeholder: 'Contraseña',
    },
    {
      placeholder: 'Repetir Contraseña',
    },
  ];
  //ViewChild(TipoComponente,{read:ElementRef}) nombre!:ElementRef<HTMLTipoObjetoElement>
  @ViewChild(IonTitle,{read:ElementRef}) titulo!:ElementRef<HTMLIonTitleElement>;
 
  constructor(private router: Router,private animationCtrl:AnimationController, private auth: AutenticacionService) { }
  private imagen!:Animation;
  private titul!:Animation;
  public mensaje = "";
  public estado: String = "";

  ngAfterViewInit() {
    this.titul = this.animationCtrl.create()
    .addElement(this.titulo.nativeElement)
    .duration(2500) 
    .iterations(Infinity)
    .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
    .fromTo('opacity', '1', '0.2');
 
  }
  

  user = {
    usuario: "",
    password: ""
  }
  
  avatarPlay(){
    this.imagen.play();
    this.titul.play();
  }

  enviarInformacion() {
    this.auth.login(this.user.usuario, this.user.password).then(() => {
      if (this.auth.autenticado) {
        let navigationExtras: NavigationExtras = {
          state: { user: this.user }
        }
        this.router.navigate(['/alumno'], navigationExtras);
      } else {
        this.mensaje = "Debe ingresar sus credenciales";
      }
    });
  }


  mostrarConsola() {
    console.log(this.user);
    if (this.user.usuario != "" && this.user.password != "") {
      this.mensaje = "Usuario Conectado";
    } else {
      this.mensaje = "Usuario y contraseña deben tener algun valor"
    }
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.auth.register(this.user.usuario, this.user.password).then((res) => {
      if (res) {
        this.estado = "Usuario Existente";
      } else {
        this.mensaje = "Registro Exitoso";
        this.modal.dismiss(this.user.usuario, 'confirm');
      }
    })
  }

  acept() {
  if (this.user.usuario && this.user.password) {
    this.auth.changePassword(this.user.usuario, this.user.password).then((res) => {
      if (res) {
        this.estado = "Contraseña cambiada con éxito";
      } else {
        this.estado = "Usuario no encontrado, se ha registrado como un nuevo usuario.";

        // En lugar de registrar el usuario aquí, deberías proporcionar una opción para registrarse desde la página de inicio de sesión.
        // Puedes abrir una modal para el registro o redirigir al usuario a una página de registro.

        // Ejemplo de redirección a la página de registro:
        this.router.navigate(['/registro']); // Asegúrate de crear una página de registro en tu aplicación.
      }
    });
  } else {
    this.mensaje = "Ingrese su nombre de usuario y una nueva contraseña Y vuevla a hacer click en  'Olvide mi Contraseña'.";
  }
}


}