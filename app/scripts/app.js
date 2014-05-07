'use strict';

var app = angular.module('angAnimationTestApp', [
    'ngRoute',
    'ngAnimate'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });


app.controller('MainCtrl', function($scope) {
  $scope.questions = [
    {'question': "Q1", 'answer': 'A1'},
    {'question': 'Q2', 'answer': 'A2'}
    ];
});





app.directive('post', function() {
  var controller = function($scope) {
    $scope.showAnswer = false;
  };

  return {
    restrict: 'E',
    scope: false,
    controller: controller
  }
});


app.animation('.answer-animation', function(){
  var that;

  CSSPlugin.defaultTransformPerspective = 1000;

  TweenMax.set($("div.back"), {rotationY:-180});

  $.each($("div.box"), function(i,element)
  {
    console.log(element);
    var frontCard = $(this).children("div.front")
    var backCard = $(this).children("div.back")
    var tl = new TimelineMax({paused:true})

    tl
      .to(frontCard, 1, {rotationY:180})
      .to(backCard, 1, {rotationY:0},0)
      // .to(element, .5, {z:50},0)
      // .to(element, .5, {z:0},.5);

    this.animation = tl;
    that = this;
  });

  // TweenLite.set('.boxWrapper', {perspective: 8200});
  // TweenLite.set('.box', {transformStyle: 'preserve-3d'});
  // TweenLite.set('.back', {rotationY:-180});
  // TweenLite.set(['.back', '.front'], {backfaceVisibility: 'hidden'});

  return {
    beforeAddClass: function(element, className, done){
      if (className == 'answer') {

        //debugger;
        var el = element.find('.box');
        console.log(el)

        that.animation.play();
        //console.log(this)
        // TweenLite.to(element.find('.box'), 1.2,
        //   {rotationY:180, ease:Back.easeOut, onComplete:done});
      }
      else {
        done();
      }
    },

    beforeRemoveClass: function(element, className, done) {
      if (className == 'answer') {

        that.animation.reverse();
        // TweenLite.to(element.find('.box'), 1.2,
        //   {rotationY:0, ease:Back.easeOut, onComplete:done});
      }
      else {
        done();
      }
    }
  };
});