import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import * as UAParser from 'ua-parser-js';

import * as dayjs from 'dayjs';
import 'dayjs/locale/es';
import { ModalService } from './services/modal/modal.service';
import { pwaContext } from './views/splash/pwa-context';
dayjs.locale('es');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public modal;
  public context = pwaContext();

  constructor(private modalService: ModalService, private update: SwUpdate) {
    if (location.protocol === 'http:' && location.hostname !== 'localhost') {
      location.replace(
        'https://' + location.origin.split('//').slice(1).join('')
      );
    }

    this.context = pwaContext();
    /*this.context.stage = 'install';
    this.context.browser = 'safari';*/
    console.log(this.context);

    // ADJUST FONT SIZE ANDROID vs iOS
    if (
      this.context?.device?.os?.name.toLowerCase().indexOf('android') !== -1
    ) {
      document.body.style.fontSize = '1em';
      // DELETE SPLASH IF IS PWA IN ANDROID
      if (
        this.context?.installed &&
        this.context?.device?.browser?.name.toLowerCase().indexOf('chrome') !==
          -1
      ) {
        this.deleteSplash();
      }
    }

    this.update
      .checkForUpdate()
      .then((updateAvailable) => {
        if (updateAvailable) {
          this.update.activateUpdate().then(() => {
            document.location.reload();
          });
        }
      })
      .catch((err) => {});

    this.modalService.onOpenModal.subscribe(({ componentId, params }) => {
      if (componentId) {
        this.modal = {
          componentId,
          params,
        };
      } else {
        this.modal = false;
      }
    });

    this.hideSplash();
  }

  private deleteSplash() {
    const splash = document.getElementById('splash');
    splash.style.display = 'none';
  }

  private hideSplash() {
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = '100%';

    setTimeout(() => {
      const splash = document.getElementById('splash');

      splash.setAttribute('class', 'splash hide');
      setTimeout(() => {
        splash.style.display = 'none';
      }, 500);
    }, 1500);
  }
}
