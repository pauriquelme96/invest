import { Component, getPlatform, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {
  @Input() stage;
  @Input() browser;

  public device: any;
  public href: any;
  public pwaInstalled: any;

  public guides: any = {
    safari: [
      {
        number: '1.',
        content: 'Pulsa el botón de <span class="txt-bld">"Compartir"</span>',
        image: './assets/guide/iphone/share_button_cut.png',
      },
      {
        number: '2.',
        content:
          'Pulsa sobre la opción <span class="txt-bld">"Añadir a pantalla de inicio"</span>',
        image: './assets/guide/iphone/add_to_homescreen.png',
      },
      {
        number: '3.',
        content: 'Pulsa en <span class="txt-bld">"Añadir"</span>',
        image: './assets/guide/iphone/add_button.png',
      },
      {
        number: '4.',
        content:
          'Busca la app en la <span class="txt-bld">"Pantalla principal"</span>',
        image: './assets/guide/iphone/app_installed.png',
      },
    ],
    chrome: [
      {
        number: '1. ',
        content:
          '<a href="http://play.google.com/store/apps/details?id=com.android.chrome" class="c-primary txt-bld">Actualiza chrome</a> a la última versión',
        image: './assets/guide/android/1_update_chrome.png',
      },
      {
        number: '2. ',
        content:
          'Pulsa sobre los 3 puntos situados <span class="txt-bld">arriba a la derecha</span>',
        image: './assets/guide/android/2_click_options.png',
      },
      {
        number: '3. ',
        content:
          'Pulsa la opción <span class="txt-bld">"Instalar aplicación"</span>',
        image: './assets/guide/android/3_click_install_app.png',
      },
      {
        number: '4. ',
        content: 'Pulsa sobre <span class="txt-bld">"Instalar"</span>',
        image: './assets/guide/android/4_click_add.png',
      },
      {
        number: '5. ',
        content:
          'La app se está <span class="txt-bld">instalando</span>, este proceso puede durar unos minutos',
        image: './assets/guide/android/5_wait_install.png',
      },
      {
        number: '6. ',
        content:
          'Búsca la app en la <span class="txt-bld">pantalla de inicio</span>',
        image: './assets/guide/android/6_homescreen.png',
      },
    ],
  };

  constructor(private router: Router) {}

  public ngOnInit(): void {
    console.log(this.browser);
  }
}
