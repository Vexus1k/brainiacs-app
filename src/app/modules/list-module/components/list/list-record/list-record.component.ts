import { Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { BrainiacsService } from 'src/app/core/services/brainiacs.service';
import { User } from 'src/app/core/models/global-interfaces';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: '[app-list-record]',
  templateUrl: './list-record.component.html',
  styleUrls: ['./list-record.component.scss']
})
export class ListRecordComponent implements OnInit {
  @Input() smartPerson!: User;
  @Output() removePersonEvent = new EventEmitter();
  @Output() editPersonEvent = new EventEmitter();
  faTrashCan: IconDefinition = faTrashCan;
  faPenToSquare: IconDefinition = faPenToSquare;
  userFormGroup!: FormGroup;
  modalRef!: NgbModalRef;

  constructor(private brainiacsService: BrainiacsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.userFormGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    })
  }

  openModal(content: any) {
    this.modalRef = this.modalService.open(content)
  }

  removePerson(id: number) {
    this.brainiacsService.removePersonFromList(id).subscribe(
      (res) => { console.log("Success Response " + res)},
      (err) => { console.log("Error happened" + err); alert('Something went wrong try again later')},
      () => {
        this.removePersonEvent.emit(id)
        this.modalRef.close();
      }
    );
  }

  editPerson(user: User) {
    this.brainiacsService.editPersonFromList(user).subscribe(
      (res) => { console.log("Success Response " + res) },
      (err) => { console.log("Error happened" + err); alert('Something went wrong try again later') },
      () => {
        user.first_name = this.userFormGroup.controls['firstName'].value
        user.last_name = this.userFormGroup.controls['lastName'].value
        user.email = this.userFormGroup.controls['email'].value
        this.editPersonEvent.emit(user);
        this.modalRef.close();
      }
    );
  }

  setFormValue(firstName: string, lastName: string, email: string) {
    this.userFormGroup.controls['firstName'].setValue(firstName);
    this.userFormGroup.controls['lastName'].setValue(lastName);
    this.userFormGroup.controls['email'].setValue(email);
  }
}
