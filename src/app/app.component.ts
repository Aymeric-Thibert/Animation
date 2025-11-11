import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import { bounce, flip, pulse, shakeX } from 'ng-animate';
import { lastValueFrom, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
  trigger("death", [
    transition(
      ":increment",
      useAnimation(shakeX, { params: { timing: 0.5 } })
    ),
  ]),
   trigger('attack', [
      transition(':increment', [
        useAnimation( pulse, {params: {timing: 0.3, scale: 4.5}}),
      ]),
    ]),
    trigger('bounce', [
      transition(':increment', [
        useAnimation( bounce, {params: {timing: 1}}),
      ]),
    ]),
    trigger('shake', [
      transition(':increment', [
        useAnimation( shakeX, {params: {timing: 0.75}}),
      ]),
    ]),
    trigger('flip', [
      transition(':increment', [
        useAnimation( flip, {params: {timing: 0.75}}),
      ]),
    ]),
],

})
export class AppComponent {
  slimeIsPresent = false;
  ng_death = 0;
  ng_scale = 0;
  ng_bounce = 0;
  ng_shake =0;
  ng_flip =0;

  css_hit= false;
  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime()
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime()

    // TODO 2e animation angular en même temps
    this.ng_death++
    
    
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    this.ng_scale ++
    setTimeout(() => this.ng_scale++,200)

    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit =true;
    setTimeout(() => this.css_hit = false, 0.3 * 1000);
  }

  async BSF(){

     this.ng_bounce++;
    await lastValueFrom(timer(1 * 1000));
    this.ng_shake++;
    await lastValueFrom(timer(0.75 * 1000));
    this.ng_flip++;



  }
  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
}
  hideSlime(){
    var element =document.getElementById("slimeyId");
    element?.classList.add("fadeOut");
    element?.classList.remove("fadeIn");


  }

  
}
