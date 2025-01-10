import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter, HostListener, SimpleChanges } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, UntypedFormArray, AbstractControl, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SharedModule } from '../../../_shared/shared.module';

@Component({
  selector: 'app-chat-view',
  imports: [FormsModule, ReactiveFormsModule, SharedModule],
  templateUrl: './chat-view.component.html',
  styleUrl: './chat-view.component.scss'
})
export class ChatViewComponent implements OnInit, OnChanges, OnDestroy {
  @Input() config: any[] = [];
  @Output() submitPrompt: EventEmitter<string> = new EventEmitter();
  reqForm: UntypedFormGroup;
  conditions: string[] = ["New", "Used"];
  types: any[] = [
    {name: "Sedan", img: "car-type/Sedan.jpg"},
    {name: "SUV", img: "car-type/SUV.jpg"},
    {name: "Hatchback", img: "car-type/Hatchback.jpg"},
    {name: "Crossover", img: "car-type/Crossover.jpg"},
    {name: "Coupe", img: "car-type/Coupe.jpg"},
    {name: "Convertible", img: "car-type/Convertible.jpg"},
    {name: "Station Wagon", img: "car-type/Station-Wagon.jpg"},
    {name: "Pickup Truck", img: "car-type/PICKUP-TRUCK.jpg"},
    {name: "Minivan/MPV", img: "car-type/Minivan.jpg"},
  ];
  brands: string[] = [
    "Abarth", "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", 
    "Buick", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Cupra", "Dacia", "Daewoo", 
    "Daihatsu", "Dodge", "DS", "Ferrari", "Fiat", "Fisker", "Ford", "Genesis", 
    "GMC", "Geely", "Great Wall", "Haval", "Honda", "Hummer", "Hyundai", "Infiniti", 
    "Isuzu", "Jaguar", "Jeep", "Kia", "Koenigsegg", "Lada", "Lamborghini", "Lancia", 
    "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid", "Maserati", "Maybach", 
    "Mazda", "McLaren", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Nikola", "Nio", 
    "Nissan", "Opel", "Pagani", "Peugeot", "Polestar", "Porsche", "RAM", "Renault", 
    "Rimac", "Rivian", "Rolls-Royce", "Saab", "Seat", "Škoda", "Smart", "SsangYong", 
    "Subaru", "Suzuki", "Tata", "Tesla", "Toyota", "Vauxhall", "Volkswagen", "Volvo", 
    "Wiesmann", "Yugo", "Zotye", "BYD", "Changan", "Chery", "Dongfeng", "FAW", "GAC", 
    "Hino", "Mahindra", "Maruti Suzuki", "Proton", "Perodua", "Scion", "Shelby", 
    "Sinotruk", "Tatra", "UAZ", "VinFast", "Wuling", "ZAZ"
  ];
  budgets: string[] = ["Any Budget", "Below $20,000", "$20,000 - $40,000", "$40,000 - $60,000", "$60,000 - $80,000", "$80,000 and Above"];
  fuels: string[] = ["Any fuel", "Petrol", "Diesel", "Hybrid", "Electric"];
  seatCount: string[] = ["Any count of seats", "2 seats", "4 seats", "5 seats", "More than 5 seats"];
  purposes: string[] = ["Daily commuting", "Weekend Getaways", "Long Road Trips", "Family activities", "Business use"];
  isvisibleBrand: boolean = false;
  selectedBrand: string[] = [];
  isvisiblePurpose: boolean = false;
  selectedPurpose: string[] = [];

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const containerBrand = document.getElementById('brand-autocompleate');
    if (containerBrand && !containerBrand.contains(event.target as Node)) {
      this.isvisibleBrand = false;
    }

    const containerPurpose = document.getElementById('purpose-autocompleate');
    if (containerPurpose && !containerPurpose.contains(event.target as Node)) {
      this.isvisiblePurpose = false;
    }
  }

  constructor(private fb: UntypedFormBuilder, private message: NzMessageService) {}

  ngOnInit(): void {
    if(this.reqForm === undefined) {
      this.initForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.reqForm === undefined) {
      this.initForm();
    }

    if(this.config.length > 0) {
      this.config.forEach((c: any) => {
        switch(c.forcus) {
          case "condition":
            this.reqForm.get("condition")?.setValue(c.value);
            break;
          case "brand":
            this.reqForm.get("brand")?.setValue(c.value);
            break;
          case "type":
            let indType: number = this.types.map(t => t.name).indexOf(c.value);
            this.typeFormArray.at(indType).setValue(true);
            break;
          case "budget":
            this.reqForm.get("budget")?.setValue(c.value);
            break;
          case "fuelType":
            let indFuelType: number = this.fuels.indexOf(c.value);
            this.fuelsFormArray.at(indFuelType).setValue(true);
            break;
          case "seating":
            this.reqForm.get("seating")?.setValue(c.value);
            break;
          case "purpose":
            this.reqForm.get("purpose")?.setValue(c.value);
            break;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.initForm();
  }

  minSelectedCheckboxes(minCount: number): any {
    return (formArray: AbstractControl) => {
      const selectedCount = (formArray as UntypedFormArray).controls
        .map(control => control.value)
        .filter(value => value === true).length;

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
    if(this.reqForm.valid){
      let text: string = `I need a ${this.reqForm.get("condition")?.value} ${this.reqForm.get("brand")?.value} vehicle, types of ${this.getVehicleTypes()}, budget ${this.reqForm.get("budget")?.value}
      fuel type ${this.getVehicleFuels()}, seats ${this.reqForm.get("seating")?.value}, for ${this.reqForm.get("purpose")?.value}`;
      this.submitPrompt.emit(text);
      this.initForm();
    } else {
      this.openSnackBar('Form Validation failed!');
    }
  }

  getVehicleTypes(): string {
    let typeList: string = "";

    this.typeFormArray.value.forEach((itm: any, index: number) => {
      if(itm){
        if (typeList !== "") {
          typeList = typeList + ", " + this.types[index].name;
        } else {
          typeList = this.types[index].name;
        }
      }
    })

    return typeList;
  }

  getVehicleFuels(): string {
    let typeList: string = "";

    this.fuelsFormArray.value.forEach((itm: any, index: number) => {
      if(itm){
        if (typeList !== "") {
          typeList = typeList + ", " + this.fuels[index];
        } else {
          typeList = this.fuels[index];
        }
      }
    })

    return typeList;
  }

  initForm(): void {
    this.reqForm = this.fb.group({
      condition: [null, [Validators.required]],
      brand: [null, [Validators.required]],
      type: this.fb.array([], [this.minSelectedCheckboxes(1)]),
      budget: [null, [Validators.required]],
      fuelType: this.fb.array([], [this.minSelectedCheckboxes(1)]),
      seating: [null, [Validators.required]],
      purpose: [null, [Validators.required]]
    });

    this.types.forEach(() => this.typeFormArray.push(this.fb.control(false)));

    this.fuels.forEach(() => this.fuelsFormArray.push(this.fb.control(false)));
  }

  openSnackBar(message: string): void {
    this.message.create('warning', message, {
      nzDuration: 3000,
    });
  }

  getBrands(e: any): void {
    this.isvisibleBrand = true;
    let val: string | null = (e.target as HTMLInputElement).value;
    let brandArr: string[] = ["Any Brand"];
    if(val !== null && val !== "") {
      let filteredArr: string[] = this.brands.filter(b => b.toLowerCase().includes(val.toLowerCase()));
      if(filteredArr.length === 0){
        this.isvisibleBrand = false;
      }
      let sortedArr: string[] = filteredArr.sort();
      this.selectedBrand = sortedArr;
    } else {
      let sortedArr: string[] = this.brands.sort();
      this.selectedBrand =  brandArr.concat(sortedArr);
    }
  }

  getPerpuses(e: any): void {
    this.isvisiblePurpose = true;
    let val: string | null = (e.target as HTMLInputElement).value;
    if(val !== null && val !== "") {
      let filteredArr: string[] = this.purposes.filter(b => b.toLowerCase().includes(val.toLowerCase()));
      if(filteredArr.length === 0){
        this.isvisiblePurpose = false;
      }
      let sortedArr: string[] = filteredArr.sort();
      this.selectedPurpose = sortedArr;
    } else {
      let sortedArr: string[] = this.purposes.sort();
      this.selectedPurpose = sortedArr;
    }
  }

  fillBrand(brand: string): void {
    this.reqForm.get("brand")?.setValue(brand);
    this.isvisibleBrand = false;
  }

  fillPurpose(purpose: string): void {
    this.reqForm.get("purpose")?.setValue(purpose);
    this.isvisiblePurpose = false;
  }
}
