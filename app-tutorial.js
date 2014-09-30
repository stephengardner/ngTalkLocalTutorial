var appTutorial = angular.module('appTutorial', ['templates/tutorial.html',
		'templates/step1A.html', 'templates/step1B.html', 'templates/step1C.html', 'templates/step2A.html'
		, 'templates/step2B.html', 'templates/step2C.html', 'templates/stepTimetable.html'
		, 'templates/step0.html'])
	.run(['$appTutorial', '$timeout', function($appTutorial, $timeout){
		window.offset = function(elm) {
			try {return elm.offset();} catch(e) {}
			var rawDom = elm[0];
			var _x = 0;
			var _y = 0;
			var body = document.documentElement || document.body;
			var scrollX = window.pageXOffset || body.scrollLeft;
			var scrollY = window.pageYOffset || body.scrollTop;
			_x = rawDom.getBoundingClientRect().left + scrollX;
			_y = rawDom.getBoundingClientRect().top + scrollY;
			return { left: _x, top:_y };
		}
		$("body").append("<div app-tutorial>{{$appTutorial}}</div>");
		$timeout(function(){
		},2000);
	}]);

appTutorial.directive('appTutorial', ['$appTutorial', function($appTutorial){
	return {
		restrict : 'AE',
		controller : 'appTutorialController',
		templateUrl : 'templates/tutorial.html'
	};
}]);

appTutorial.directive('tutorialStep0', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step0.html',
		controller : 'tutorialStep0Controller'
	};
}]);

appTutorial.directive('tutorialStep1a', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step1A.html',
		controller : 'tutorialStep1AController'
	};
}]);
appTutorial.directive('tutorialStep1b', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step1B.html',
		controller : 'tutorialStep1BController'
	};
}]);
appTutorial.directive('tutorialStep1c', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step1C.html',
		controller : 'tutorialStep1CController'
	};
}]);
appTutorial.directive('tutorialStep2a', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step2A.html',
		controller : 'tutorialStep2AController'
	};
}]);
appTutorial.directive('tutorialStep2b', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step2B.html',
		controller : 'tutorialStep2BController'
	};
}]);
appTutorial.directive('tutorialStep2c', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/step2C.html',
		controller : 'tutorialStep2CController'
	};
}]);

appTutorial.directive('tutorialStepTimetable', [function(){
	return {
		restrict : 'AE',
		templateUrl : 'templates/stepTimetable.html',
		controller : 'tutorialStepTimetableCController'
	};
}]);

appTutorial.factory('$appTutorial', ['Storage', function(Storage){
	var Tutorial = {
		state : 'hidden',
		stages : {
			reset : function() {
				Tutorial.stages.step1 = "A";
				Tutorial.stages.step2 = "A";
			},
			step1 : "A",
			step2 : "A",
			timetable : "A"
		},
		activateStep : function(step) {
			this.header = false;
			if(step == 0) {
				this.step0();
			}
			if(step == 1) {
				if(this.stages.step1 == "A")
					this.step1A();
				if(this.stages.step1 == "B")
					this.step1B();
				if(this.stages.step1 == "C")
					this.step1C();
			}
			if(step == 2) {
				if(this.stages.step2 == "A")
					this.step2A();
				if(this.stages.step2 == "B")
					this.step2B();
				if(this.stages.step2 == "C")
					this.step2C();
			}
			if(step == 'timetable') {
				if(this.stages.timetable == "A") {
					this.stepTimetableA();
				}
				else if(this.stages.timetable == "B") {
					this.stepTimetableB();
				}
				this.header = true;
			}
		},

		step0 : function() {
			this.state = 'step0';
		},

		step1A : function() {
			$(".highlight").removeClass("highlight");
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".what").removeClass("GPUAccel").addClass("highlight highlight-shadow");
			this.state = 'step1A';
			this.stages.reset();
			this.stages.step1 = "A";
		},
		step1B : function() {
			$(".what").removeClass("highlight");
			$(".where-text, #where-button").addClass("highlight-shadow");
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".where").addClass("highlight");
			this.state = 'step1B';
			this.stages.step1 = "B";
		},
		step1C : function() {
			$(".what, .where").addClass("highlight");
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".action-button").addClass("highlight highlight-shadow");
			$("form h1").addClass("highlight");
			this.state = 'step1C';
			this.stages.step1 = "C";
		},
		step2A : function() {
			$(".highlight").removeClass("highlight");
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".description textarea").addClass("highlight highlight-shadow");
			this.state = 'step2A';
			this.stages.step2 = "A";
		},
		step2B : function() {
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".description textarea").removeClass("highlight highlight-shadow");
			$(".time-button").addClass("highlight highlight-shadow");
			this.state = 'step2B';
			this.stages.step2 = "B";
		},
		step2C : function() {
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".description textarea").addClass("highlight highlight-shadow");
			$("h1").addClass("highlight");
			$(".time-button").addClass("highlight highlight-shadow");
			$(".btn.action-button").addClass("highlight highlight-shadow");
			this.state = 'step2C';
			this.stages.step2 = "C";
		},
		stepTimetableA : function() {
			$(".GPUAccel").addClass("pauseGPUAccel");
			//$(".timetable").addClass("highlight");
			//$(".aside").addClass("highlight");
			//$(".timetable .head").addClass("highlight");
			//$(".btn.action-button").addClass("highlight highlight-shadow");
			this.state = 'stepTimetableA';
		},
		stepTimetableB : function() {
			$(".GPUAccel").addClass("pauseGPUAccel");
			$(".timetable").addClass("highlight");
			$(".aside").addClass("highlight");
			$(".timetable .head").addClass("highlight");
			$(".btn.action-button").addClass("highlight highlight-shadow");
			this.state = 'stepTimetableB';
		},
		removeShadow : function() {
			$(".highlight-shadow").removeClass("highlight-shadow");
		},
		hide : function(){
			$("*").removeClass("highlight highlight-shadow");
			$(".GPUAccel").removeClass("pauseGPUAccel");
			this.removeShadow();
			this.state = "hidden";
		},
		dontShowAgain : function() {
			Storage.tutorialDismissed = true;
			Storage.set();
			this.hide();
		}
	};
	return Tutorial;
}]);

appTutorial.controller('appTutorialController', ['Storage', 'appStateTracker', '$rootScope', 'Request', 'User', '$scope', '$appTutorial',
	function(Storage, appStateTracker, $rootScope, Request, User, $scope, $appTutorial) {
	$scope.appStateTracker = appStateTracker;
	$scope.$appTutorial = $appTutorial;
	$scope.User = User;
	$scope.Request = Request;
		$scope.$on('$stateChangeStart', function(){
			$(".GPUAccel").removeClass("pauseGPUAccel");
		});
	$scope.$watch('appStateTracker.pageLoaded', function(){
		if(Storage.tutorialDismissed)
			return false;
		if($scope.appStateTracker.pageLoaded == 'step1') {
			$appTutorial.activateStep(0);
		}
		if($scope.appStateTracker.pageLoaded == 'step2') {
			$appTutorial.activateStep(2);
		}
		if($scope.appStateTracker.pageLoaded == 'timetable') {
			$appTutorial.activateStep('timetable');
		}
	});
	$scope.$watch('User.zipcode', function(){
		if($appTutorial.state == "step1B" && /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(User.zipcode))
			$appTutorial.step1C();
	});
}]);

appTutorial.controller('tutorialStep0Controller', ['$scope', function($scope){
	$scope.position = {
		top : $(".what").offset().top + $(".what").height() + 20,
		left : $(".what").offset().left
	};
}]);

appTutorial.controller('tutorialStep1AController', ['$scope', function($scope){
	$scope.position = {
		top : $(".what").offset().top + $(".what").height() + 20,
		left : $(".what").offset().left
	};
}]);

appTutorial.controller('tutorialStep1BController', ['$scope', function($scope){
	$scope.position = {
		description : {
			top : $(".where").offset().top + $(".where").height() + 20,
			left : $(".where").offset().left
		},
		button : {
			top : $(".where").offset().top - 40, // 40 adjusts 20 for the blurb height and then 20 for the offset
			right : ($(window).width() - ($(".where").offset().left + $(".where").outerWidth()))
		}
	};
	console.log("position is: ", $scope.position);
}]);

appTutorial.controller('tutorialStep1CController', ['$scope', function($scope){
	$scope.position = {
		description : {
			top : $(".where").offset().top + $(".where").height() + 10,
			left : $(".ui-view-container").offset().left
		}
	};
}]);


appTutorial.controller('tutorialStep2AController', ['$scope', function($scope){
	$scope.position = {
		description : {
			top : $(".description").offset().top + $(".description").height(),
			left : $(".ui-view-container").offset().left
		}
	};
}]);

appTutorial.controller('tutorialStep2BController', ['$scope', function($scope){
	$scope.position = {
		description : {
			top : $(".time-buttons").offset().top + $(".time-buttons").height() + 20,
			left : $(".ui-view-container").offset().left
		}
	};
}]);

appTutorial.controller('tutorialStep2CController', ['$scope', function($scope){
	$scope.position = {
		description : {
			top : $("#step2Next").offset().top + $("#step2Next").height() + 20,
			left : $(".ui-view-container").offset().left
		}
	};
}]);
appTutorial.controller('tutorialStepTimetableCController', ['$scope', function($scope){
	$scope.position = {
		description : {
			top : $(".timetable").offset().top,
			left : $(".ui-view-container").offset().left
		}
	};
}]);

angular.module("templates/tutorial.html", []).run(["$appTutorial", "$templateCache", function($appTutorial, $templateCache) {
	$templateCache.put("templates/tutorial.html",
		'<div ng-if="$appTutorial.state != \'hidden\'" class="app-tutorial-overlay">' +
		'</div>' +
		'<div class="app-tutorial" ng-if="$appTutorial.state != \'hidden\'">' +
			'<div ng-if="$appTutorial.header" class="fixed-header">' +
				'<div id="nav" class="icon highlight" ng-class="{ forward : navigation.direction == \'forward\' }" ng-click="nav()" style="display: block;">' +
				'<img height="25px" width="35px" src="images/back.png" class="highlight">' +
				'</div>' +
			'</div>' +
			'<div ng-click="$appTutorial.hide()"class="close">' +
			'<span>close</span>' +
			'<i class="fa fa-times"></i>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step0\'" tutorial-step0>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step1A\'" tutorial-step1A>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step1B\'" tutorial-step1B>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step1C\'" tutorial-step1C>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step2A\'" tutorial-step2A>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step2B\'" tutorial-step2B>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'step2C\'" tutorial-step2C>' +
			'</div>' +
			'<div ng-if="$appTutorial.state == \'stepTimetableA\'" tutorial-step-timetable>' +
			'</div>' +
		'</div>'
	);
}]);

angular.module("templates/step0.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step0.html",
		'<div class="tutorial-step0">' +
			'<div class="table-cell">' +
				'<div class="tutorial-container">' +
					'<header>' +
					'Welcome to talklocal, The fastest way to get connected to quality pros! Let\'s get started!' +
					'</header>' +
					'<div class="buttons">' +
					'<div class="btn btn-block btn-info" ng-click="$appTutorial.step1A();">Take the Tour!</div>' +
					'<div class="btn btn-block btn-default" ng-click="$appTutorial.hide()">No Thanks</div>' +
					'<div class="btn btn-block btn-default" ng-click="$appTutorial.dontShowAgain()">Don\'t show again</div>' +
				'</div>' +
			'</div>' +
		'</div>'
	);
}]);

angular.module("templates/step1A.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step1A.html",
		'<div class="tutorial-step1">' +
			'<div class="select-blurb" ng-style="{top : position.top, left : position.left}">' +
			'<div>First, pick a service you need help with!</div>' +
			'<div class="btn btn-primary" ng-if="Request.category" ng-click="$appTutorial.step1B()">' +
			'Continue ' +
			'<i class="fa fa-arrow-right"></i>' +
			'</div>' +
			'</div>'+
		'</div>'
	);
}]);

angular.module("templates/step1B.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step1B.html",
		'<div>' +
			'<div class="select-blurb" ng-style="{top : position.description.top, left : position.description.left}">' +
			'<div>' +
			'Great, now, tell us where you need help!' +
			'</div>' +/*
			'<div class="pull-right button-description">' +
			'Or click here to get your current location!' +
			'</div>' +*/
			'<div class="btn btn-default" ng-if="User.isZipcodeValid()" ng-click="$appTutorial.step1A()">' +
			'<i class="fa fa-arrow-left"></i>' +
			' Back' +
			'</div>' +
			'<div class="btn btn-primary" ng-if="User.isZipcodeValid()" ng-click="$appTutorial.step1C()">' +
			'Continue ' +
			'<i class="fa fa-arrow-right"></i>' +
			'</div>' +
			'</div>'
	);
}]);

angular.module("templates/step1C.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step1C.html",
		'<div>' +
			'<div class="select-blurb" ng-style="{top : position.description.top, left : position.description.left}">' +
			'Make sure these details look right, and click Next to continue!' +
			'</div>' +
		'</div>'
	);
}]);

angular.module("templates/step2A.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step2A.html",
		'<div>' +
			'<div class="select-blurb" ng-style="{top : position.description.top, left : position.description.left}">' +
			'<div>' +
				'Tell us what you need a {{Request.category}} for. Provide specific information so we can find you the best match!' +
			'</div>' +
			'<div class="btn btn-primary" ng-disabled="!Request.isDescriptionValid()" ng-click="$appTutorial.step2B()">' +
			'<div ng-if="Request.isDescriptionValid()">Continue <i class="fa fa-arrow-right"></i></div>' +
			'<div ng-if="!Request.isDescriptionValid()">7 words minimum</div>' +
		'</div>'
	);
}]);

angular.module("templates/step2B.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step2B.html",
		'<div>' +
			'<div class="select-blurb" ng-style="{top : position.description.top, left : position.description.left}">' +
				'<div>' +
					'Cool! Now select a time you\'d like the service, or pick from the calendar' +
				'</div>' +
			'<div class="btn btn-default" ng-click="$appTutorial.step2A()">' +
			'<i class="fa fa-arrow-left"></i>' +
			' Back' +
			'</div>' +
			'<div class="btn btn-primary" ng-click="$appTutorial.step2C()">' +
			'Continue ' +
			'<i class="fa fa-arrow-right"></i>' +
			'</div>' +
			'</div>' +
		'</div>'
	);
}]);

angular.module("templates/step2C.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/step2C.html",
		'<div>' +
			'<div class="select-blurb" ng-style="{top : position.description.top, left : position.description.left}">' +
			'' +
			'</div>' +
		'</div>'
	);
}]);

angular.module("templates/stepTimetable.html", []).run(["$templateCache", function($templateCache) {
	$templateCache.put("templates/stepTimetable.html",
		'<div>' +
			'<div class="select-blurb" ng-style="{top : position.description.top, left : position.description.left}">' +
				'<div>' +
					'<strong><i class="fa fa-calendar"></i> Welcome to the Calendar Page!</strong>' +
					'From here you can choose times which are convenient for your service appointment, or press the back button to ' +
					'return to the previous page.' +
				'</div>' +
			'<div class="btn btn-info" ng-click="$appTutorial.stepTimetableB();">Ok, got it! <i class="fa fa-arrow-right"></i></i></div>' +
		'</div>'
	);
}]);
