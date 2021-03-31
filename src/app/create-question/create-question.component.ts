import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {

  qGeneratorForm: FormGroup;

  qusetions: any[] = [
    {
      title: '',
      qusetions: [],
      answers: []
    }
  ];

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    // create reactive form
    this.qGeneratorForm = this.fb.group({
      title: [""],
      question: [""],
    });    
  }

  addQusetion() {    
    // get values
    let qusetion = this.qGeneratorForm.get('question').value;
    // get answers
    let answers = qusetion.match(/\(.+?\)/g);
    // create blank
    let input = this.qGeneratorForm.get('question').value.replace(/\(.+?\)/g, '<input type="text" class="form-control js-question-generator" style="width: 100px !important; display: inline; margin=0 5px" />');

    // save values
    this.qusetions[0].title = this.qGeneratorForm.get('title').value;
    this.qusetions[0].qusetions.push(input);
    for (let i = 0; i<= answers.length - 1; i++)
      this.qusetions[0].answers.push(answers[i]);

    // if user wants to add new question
    this.qGeneratorForm.get('question').setValue('');

    // save array of questions
    localStorage.setItem('questions', JSON.stringify(this.qusetions));
  }

}
