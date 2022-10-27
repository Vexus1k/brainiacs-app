import { Component, OnInit } from '@angular/core';
import { BrainiacsService } from 'src/app/core/services/brainiacs.service';
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { readDataFromObject, User } from "../../../../core/models/global-interfaces";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  faPlus: IconDefinition = faPlus;
  faUserGroup: IconDefinition = faUserGroup;
  smartGuysList!: Array<User>;
  userFormGroup!: FormGroup;
  modalRef!: NgbModalRef;

  constructor(private brainiacsService: BrainiacsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.brainiacsService.getFamousPeopleList().subscribe((res) => {
      this.smartGuysList = res
    });
    this.userFormGroup = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required])
    })
  }

  openModal(content: any) {
    this.userFormGroup.reset();
    this.modalRef = this.modalService.open(content)
  }

  addUser() {
    let user: User = this.userFormGroup.value;
    user.id = this.smartGuysList[this.smartGuysList.length - 1].id! + 1
    user.first_name = this.userFormGroup.controls['firstName'].value
    user.last_name = this.userFormGroup.controls['lastName'].value
    user.email = this.userFormGroup.controls['email'].value
    this.brainiacsService.addPersonToList(user).subscribe(
      (res) => { console.log("Success Response " + res)},
      (err) => { console.log("Error happened" + err); alert('Something went wrong try again later')},
      () => {
        this.smartGuysList.push(user);
        this.modalRef.close();
      }
    )
  }

  removeUser(id: string) {
    let person = this.smartGuysList.filter((res: readDataFromObject) => res['id'] == id)[0]
    const index = this.smartGuysList.indexOf(person, 0);
    if (index > -1) {
      this.smartGuysList.splice(index, 1);
    }
  }

  editUser(user: User) {
    this.smartGuysList.filter((res) => res['id'] == user.id)[0] = user
    return user;
  }
}
