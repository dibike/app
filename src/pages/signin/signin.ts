import { Component,ViewChild } from '@angular/core';
import { App,Platform, Alert, NavController, Slides, LoadingController, ToastController,ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { RestProvider } from '../../providers/rest/rest';
import { TabsPage } from '../tabs/tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SigninPage {

  @ViewChild('slider') slider: Slides;
  @ViewChild('form') form: NgForm;
  credentialsForm: FormGroup;
  slideEmailForm: FormGroup;
  slideDocumentForm: FormGroup;
  slideNameForm: FormGroup;
  slideSexForm: FormGroup;
  slidePasswordForm: FormGroup;
  Form: object;
  Labels: object;

  constructor(
    public navCtrl: NavController, 
    public formBuilder: FormBuilder, 
    public loading: LoadingController, 
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public request: RestProvider,
    private app: App,
    private authService:AuthServiceProvider,
  ) {
      this.Form = {
        email : "", 
        name : "", 
        document : "", 
        sex : "", 
        password : "", 
      };
      this.Labels = {
        next : "Prosseguir", 
        back : "Voltar", 
      };
      this.slideEmailForm = formBuilder.group({
          email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')]],
      });
      this.slideDocumentForm = formBuilder.group({
        document: ['', [Validators.required,Validators.minLength(11),Validators.maxLength(11)]],
      });
      this.slideSexForm = formBuilder.group({
        sex: ['', [Validators.required]],
      });
      this.slideNameForm = formBuilder.group({
        name: ['', [Validators.required,Validators.minLength(2)]],
      });
      this.slidePasswordForm = formBuilder.group({
          password: ['', [Validators.required,Validators.minLength(4),Validators.maxLength(30)]],
      });
   }
  
  backButtonAction(){
    this.modalhide();
  }
  
  ngAfterViewInit() {
    // child is set
    this.slider.lockSwipes(true);
  }

  goToSlide(number) {
    this.slider.lockSwipes(false);
    this.slider.slideTo(number,700);
    this.slider.lockSwipes(true);
  }

  nextSlide(type='next') {
    this.slider.lockSwipes(false);
    var number = ( type == 'next') ? (this.slider.getActiveIndex()+1) : (this.slider.getActiveIndex()-1) ;
    this.slider.slideTo( number,700);
    this.slider.lockSwipes(true);
  }

  backSlide() {
    this.slider.lockSwipes(false);
    this.slider.slideTo( (this.slider.getActiveIndex()-1),700);
    this.slider.lockSwipes(true);
  }
  
  modalhide() {
    this.viewCtrl.dismiss();
  }
  
  submit(form : FormGroup,last=false) {
    if (!form.valid) 
      return false;

    if(last==true)
      return this.finally();

    return this.nextSlide();
  }

  finally() {
    let self = this;
    // this.request.login({lorem:"ipsum"});
    this.toastCtrl.create({ duration: 3000, position: 'bottom', showCloseButton : true, closeButtonText: "OK", cssClass: "-toast-success" })
    .setMessage('Bem-vindo')
    .present();      
    this.app.getRootNav().setRoot(TabsPage);
    this.modalhide();
    
  }
}