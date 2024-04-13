import { Component, OnInit, Input } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { QuizService } from "src/services/quiz.service";


@Component({
    selector: 'app-addTheme',
    templateUrl: './addTheme.component.html',
    styleUrls: ['./addTheme.component.scss']
})

export class AddThemeComponent implements OnInit {
    public themeForm: FormGroup;
  
    constructor(public formBuilder: FormBuilder, public quizService: QuizService){
        this.themeForm = this.formBuilder.group({
            theme: ['']
          });  
    }

    ngOnInit(): void {}

    addTheme(){
        this.quizService.addTheme(this.themeForm.value.theme);
      }
}
