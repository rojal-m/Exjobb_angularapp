import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { labels, objProperty } from 'src/app/formStructure';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.css']
})
export class FormInputComponent implements OnInit, OnChanges {
  
  @Input() property!: objProperty;
  @Input() language!: string;
  
  @Output() propertyChange = new EventEmitter<any>();
  
  lang!: keyof labels;
  isRequired!: boolean;
  propertyName!: string;

  handleInputChange(value: any): void {
    // Emit the property change event with the updated value
    this.propertyChange.emit({ name: this.propertyName, value });
  }

  // Function to get the label in the specified language or fallback to default
  getSelectedLang(labels: labels):string {
    return labels[this.lang] ?? labels.default;
  };
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['language']) {
      this.lang = changes['language'].currentValue as keyof labels;
    }
    else{
      console.log(changes);
    }
  }
  ngOnInit(): void {
    this.lang = this.language as keyof labels;
    this.isRequired = this.property.min != 0;
    this.propertyName = this.property.property.value;
  }
}
