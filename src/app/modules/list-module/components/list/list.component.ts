import { Component, OnInit } from '@angular/core';
import { BrainiacsService } from 'src/app/core/services/brainiacs.service';
import { faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";
import { readDataFromObject, User } from "../../../../core/models/global-interfaces";



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  faPlus: IconDefinition = faPlus;
  faUserGroup: IconDefinition = faUserGroup;
  smartPeopleList!: Array<User>;

  constructor(private brainiacsService: BrainiacsService) { }

  ngOnInit(): void {
    this.brainiacsService.getFamousPeopleList().subscribe((res) => {
      this.smartPeopleList = res
    });
  }

  addPerson() {

  }

  removePerson(id: string) {
    let person = this.smartPeopleList.filter((res: readDataFromObject) => res['id'] == id)[0]
    const index = this.smartPeopleList.indexOf(person, 0);
    if (index > -1) {
      this.smartPeopleList.splice(index, 1);
    }
  }

  editPerson(user: User) {
    this.smartPeopleList.filter((res) => res['id'] == user.id)[0] = user
    return user;
  }
}
