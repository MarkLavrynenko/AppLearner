angular.module("LearnerApp", ['ngStorage'])
	.controller("WordCtr", function($scope, $localStorage) {
		$scope.words = $localStorage.words || [];
		$scope.word = {}

		$scope.openDialog = function() {
			$("#new-word").modal("show");
		}

		$scope.closeDialog = function() {
			$scope.word = {};
			$("#new-word").modal("hide");
		}

		$scope.addWord = function addWord () {
			$scope.words.push({ text : $scope.word.text,
				desc : $scope.word.desc });
			$localStorage.words = $scope.words;
			$scope.closeDialog();
		}

		$scope.removeWord = function(word) {
			var index = $scope.words.indexOf(word);
			$localStorage.words = $scope.words;
			$scope.words.splice(index, 1);
		}
	})
	.directive("mediaPlayer", function(MediaService) {
		return {
			scope : {
				word : "="
			},
			templateUrl : "/MediaPlayer.html",
			link : function($scope, element) {
				element.find(".play-google").click(function() {
					MediaService.loadTrack($scope.word, "google");
				});
				element.find(".play-urban").click(function() {
					MediaService.loadTrack($scope.word, "urban");
				});
			}
		}
	})
	.service("MediaService", function($http) {		
		this.loadTrack = function(word, provider) {
			$http.get("http://kbp-mlav.local:9000/media", {
				params : {
					provider : provider,
					word : word
				}
			}).then(function(data){
					alert("Data from " + provider);
			});
			// $http.get("https://translate.google.com/translate_tts?ie=UTF-8&q=" + word + "&tl=en&total=1&idx=0&textlen=5&client=t").then(function(data) {
			// 	debugger;
			// });
			// $http.get("http://www.urbandictionary.com/define.php?term=" + word).then(function(html){
			// 	var urls = $(html).find(".play-sound:eq(0)").data("urls");
			// 	console.log(urls);
			// });
		}		
	})