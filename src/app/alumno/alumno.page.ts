import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonAvatar } from '@ionic/angular';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {
  @ViewChild(IonAvatar, { read: ElementRef }) avatar!: ElementRef<HTMLIonAvatarElement>;
  public alertButtons = ['OK'];
  private animation!: Animation;
  public user = {
    usuario: '',
    password: '',
  };
  public informacion = {
    nombre: '',
    apellido: '',
    nivel: '',
    fecha: '',
  };
  currentDate: string = '';

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(() => {
      let state = this.router.getCurrentNavigation()?.extras.state;
      if (state) {
        this.user.usuario = state['user'].usuario;
        this.user.password = state['user'].password;
        console.log(this.user);
      }
    });

    this.getCurrentDateTime();
  }

  getCurrentDateTime() {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    this.currentDate = now.toLocaleDateString(undefined, options);
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.avatar.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2')
      .keyframes([
        { offset: 0, transform: 'scale(1)', opacity: '1' },
        { offset: 0.5, transform: 'scale(1.5)', opacity: '0.3' },
        { offset: 1, transform: 'scale(1)', opacity: '1' },
      ]);
  }
 
  play() {
    this.animation.play();
  }

  pause() {
    this.animation.pause();
  }

  stop() {
    this.animation.stop();
  }
}
