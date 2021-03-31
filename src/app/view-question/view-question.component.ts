import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css']
})
export class ViewQuestionComponent implements OnInit {
  isRendering = true;
  title: string = '';
  questions: any[] = [];
  answers: any[] = [];

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.initView();
  }

  // get questions

  initView() {
    let questions: any = JSON.parse(localStorage.getItem("questions"));
    this.title = questions[0].title;
    this.questions = questions[0].qusetions
    this.appendHTML(this.questions);
    this.saveInputValue();
  }

  // append inputs to html

  appendHTML(questions) {
    let list = document.getElementById('js_questions');
    let li = '';
    for (let i = 0; i <= questions.length - 1; i++) {
      li += `<li class="list-group-item">${questions[i]}</li>`
    }
    list.innerHTML = li;
  }

  // allow each input to save its value

  saveInputValue() {
    let blanks = document.getElementsByClassName('js-question-generator');

    for (let i = 0; i <= blanks.length -1; i++) {
      blanks[i].addEventListener('keyup', function(e: any) {
        if (e.keyCode == 8 || e.keyCode == 13 || e.keyCode == 18 || e.keyCode == 9 || e.keyCode == 27) {
          return;
        }
        let value = blanks[i].getAttribute('value') //+ e.key
        value = (value == null) ? e.key : value + e.key

        blanks[i].setAttribute('value', value)
      })
    }
  }

  // get user answers

  submit() {
    let blanks = document.getElementsByClassName('js-question-generator');
    
    this.answers = [];

    for (let i = 0; i <= blanks.length -1; i++) {
      this.answers.push(blanks[i].getAttribute('value'))
    }   
  }

}
