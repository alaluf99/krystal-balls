import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

export interface Floor {
  index: number;
  img: string;
}

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.less']
})
export class BuildingsComponent implements OnInit, AfterViewInit {
  floors: Floor[] = [];
  numOfThrows = 1;

  @ViewChild('content', {static: false}) content;
  modalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  updateNumOfFloors(formData: any) {
    if (isNaN(Number(formData.numOfFloors))) {
      alert('מספר קומות לא תקין');
      return;
    }
    this.floors = [];
    for (let i = 1; i <= Number(formData.numOfFloors); i++) {
      console.log(i);

      let newFloor: Floor;
      const regularfloorImg = './../assets/imgs/regular.png';
      const firstfloorImg = './../assets/imgs/first.png';
      const lastfloorImg = './../assets/imgs/last.png';
      if (i == 1) {
        newFloor = {index: i, img: firstfloorImg};
      } else if (i == Number(formData.numOfFloors)) {
        newFloor = {index: i, img: lastfloorImg};
      } else {
        newFloor = {index: i, img: regularfloorImg};
      }
      this.floors.push(newFloor);
    }
    this.calculateMaxNumberOfThrows();
    this.modalRef.close();
  }

  calculateMaxNumberOfThrows() {
    while ((this.numOfThrows * (this.numOfThrows - 1)) / 2 < this.floors.length) {
      this.numOfThrows++;
    }
    this.numOfThrows = this.numOfThrows - 1;
  }

  openWindowCustomClass(content) {
    this.modalRef = this.modalService.open(content, { windowClass: 'dark-modal' });
  }

  ngAfterViewInit(): void {
    this.openWindowCustomClass(this.content);
  }
}

