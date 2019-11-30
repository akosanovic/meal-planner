import { Recipe } from './../../recipes/recipe.model';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-empty-placeholder',
  templateUrl: './empty-placeholder.component.html',
  styleUrls: ['./empty-placeholder.component.css']
})
export class EmptyPlaceholderComponent implements OnInit {
  public isOpen = false;

  @Input() dropdownOptions: Recipe[] = [];
  @Input() meal: 'breakfast' | 'lunch' | 'dinner' = 'breakfast';
  @Output() optionSelected = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectedOption(option) {
    this.optionSelected.emit({meal: this.meal, recipe: option});
  }
}
