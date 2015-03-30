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
	.directive("mediaPlayer", function() {
		return {
			scope : {
				word : "="
			},
			templateUrl : "/MediaPlayer.html",
			link : function($scope, element) {
				var audio = angular.element("<audio></audio>").get(0);
				element.append(audio);
				element.find(".play-google").click(function() {
					playAudio("google", $scope.word);					
					
				});
				element.find(".play-urban").click(function() {
					playAudio("urban", $scope.word);
				});

				function playAudio(provider, word) {
					var audioUrl = "http://kbp-mlav.local:9000/media?provider=" + provider + "&word=" + word;
					audio.src = audioUrl;
					audio.play();
				}
			}
		}
	})