(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ball = document.querySelector(".ball");
var score = document.querySelector(".score");

var speed = 10;

var height = 1;
var gravity = 0.1;


var initialHeight = 600;

var ballTop = initialHeight;
var ballLeft = 5;

var intervalId = window.setInterval(function() {
  score.textContent = ballLeft;
  ballTop -= height;
  ball.style.top = ballTop;

  ballLeft += speed;
  ball.style.left = ballLeft;

  height -= gravity;

  if((ballTop > initialHeight) && height<0) {
    window.clearInterval(intervalId);
  }

}, 500);

},{}]},{},[1]);
