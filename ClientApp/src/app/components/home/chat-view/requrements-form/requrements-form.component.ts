import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter, HostListener, SimpleChanges } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, AbstractControl, Validators, FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-requrements-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './requrements-form.component.html',
  styleUrl: './requrements-form.component.scss',
})
export class RequrementsFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config: any[] = [];
  @Output() submitPrompt: EventEmitter<string> = new EventEmitter();
  reqForm: UntypedFormGroup;
  selectedPurpose: string[] = [];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {}

  constructor(
    private fb: UntypedFormBuilder,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.reqForm === undefined) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.reqForm === undefined) {
      this.initForm();
    }
  }

  ngOnDestroy(): void {
    this.initForm();
  }

  minSelectedCheckboxes(minCount: number): any {
    return (formArray: AbstractControl) => {
      const selectedCount = (formArray as UntypedFormArray).controls
        .map((control) => control.value)
        .filter((value) => value === true).length;

      return selectedCount >= minCount ? null : { minSelected: true };
    };
  }

  get typeFormArray(): UntypedFormArray {
    return this.reqForm.get('type') as UntypedFormArray;
  }

  get fuelsFormArray(): UntypedFormArray {
    return this.reqForm.get('fuelType') as UntypedFormArray;
  }

  generateText(): void {
    if (this.reqForm.valid) {
      let text: string = `Please find a land for me with the following requirements: \n
      \tZip Code: <b>${this.reqForm.get('zip_code')?.value}</b></b>`;
      this.submitPrompt.emit(text);
      this.initForm();
    } else {
      this.openSnackBar('Form Validation failed!');
    }
  }

  initForm(): void {
    this.reqForm = this.fb.group({
      zip_code: [null, [Validators.required]],
    });
  }

  openSnackBar(message: string): void {
    this.message.create('warning', message, {
      nzDuration: 3000,
    });
  }
}
