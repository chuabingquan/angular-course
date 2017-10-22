import { Component, OnInit, Input, Inject } from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';

import { Comment } from '../shared/comment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

  dish: Dish;
  dishCopy = null;
  dishIds: number[];
  prev: number;
  next: number;
  comment: Comment;
  commentForm: FormGroup;
  errMess: string;
  formErrors = {
    'rating': '',
    'comment': '',
    'author': ''
  };

  validationMessages = {
    'comment': {
      'required': 'Comment is required.'
    },
    'author': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 2 characters long.'
    }
  };

  constructor(private dishService: DishService, private route: ActivatedRoute, 
      private location: Location, private fb: FormBuilder, @Inject('BaseUrl') private BaseUrl) {
    this.createForm();
  }

  ngOnInit() {
    this.dishService.getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds);
    this.route.params
      .switchMap((params: Params) => this.dishService.getDish(+params['id']))
      .subscribe(dish => {
        this.dish = dish;
        this.dishCopy = dish;
        this.setPrevNext(dish.id);
      }, errMess => this.errMess = <any>errMess);
  }

  createForm() {
    this.commentForm = this.fb.group({
      rating: [5, []],
      comment: ['', [Validators.required]],
      author: ['', [Validators.required, Validators.minLength(2)]],
      date: ['']
    });

    this.commentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();
  }

  onValueChanged(data?: any) {
    if(!this.commentForm) { return; }
    const form = this.commentForm;

    for (const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = form.get(field);
      if(control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  setPrevNext(dishId: number) {
    let index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    console.log(this.comment);
    this.dishCopy.comments.push(this.comment);
    this.dishCopy.save()
      .subscribe(dish => this.dish = dish);
    this.commentForm.reset({
      rating: 5,
      comment: '',
      author: '',
      date: ''
    });
  }
}
