import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('goals',[
      transition('*=>*',[
        query(':enter',style({ opacity:0 }), {optional:true}),

        query(':enter',stagger('1s',[
          animate('.6s ease-in',keyframes([
            style({opacity:0, transform:'translateY(-75%)',offset:0}),
            style({opacity:0.5, transform:'translateY(-50%)',offset:0.5}),
            style({opacity:1, transform:'translateY(0%)',offset:1}),
          ]))
        ]), {optional:true}),

        query(':leave',stagger('1s',[
          animate('.6s ease-in',keyframes([
            style({opacity:1, transform:'translateY(5%)',offset:0}),
            style({opacity:0.5, transform:'translateY(-50%)',offset:0.5}),
            style({opacity:0, transform:'translateY(-80%)',offset:1}),
          ]))
        ]), {optional:true})
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {
  itemCount = 3 ;
  btnText = 'Add an Item';
  goalText = 'first goal';
  goals = [];

  constructor(private _data:DataService) { }

  ngOnInit() {
    this._data.goal.subscribe(res=>this.goals= res);
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
    
    
  }

  addItem() {
    if(this.goalText!=""){
    this.goals.push(this.goalText);
    }
    else{
      alert('dont try to add empty string');
    }
    this.goalText = "";
    this.itemCount = this.goals.length;
    this._data.changeGoal(this.goals);
    console.log(this.goals);
  }

  deleteItem(goal:string,index) {
    this.goals.splice(index, 1);
    this.itemCount = this.goals.length;    
    this._data.changeGoal(this.goals);
    console.log(this.goals);  

}



}
