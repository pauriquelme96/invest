import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  public onOpenModal = new Subject();

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(({ modal = '{}' }) => {
      modal = JSON.parse(modal);
      this.onOpenModal.next(modal);
    });
  }

  public openModal(componentId, params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        modal: JSON.stringify({
          componentId,
          params,
        }),
      },
    });
  }

  public closeModal(delay: number = 700) {
    setTimeout(() => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {},
      });
    }, delay);
  }
}
