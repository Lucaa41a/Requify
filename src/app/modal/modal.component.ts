import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'doc-modal-neutral',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  public isModalOpen = false;

  public open(): void {
    this.isModalOpen = true;
  }

  public close(): void {
    this.isModalOpen = false;
  }

  public executeWhenCloseAnimationEnds(): void {
  }
}

