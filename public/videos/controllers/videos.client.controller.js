'use strict';

// using four injected services
// routeParams is provided with the ngRoute module and holds refs to 
// route parameters of the AngularJS routes you'll define next
// $location allows you to control naviation of your app
// Authentication - you created and provides with authenticated user info
// Videos - provides you with set mof methods to communicate w/ RESTful
// endpoints
angular.module('videos').controller('VideosController', ['$scope', '$routeParams', '$location', '$upload', 'Authentication', 'Girls', 'Videos', function($scope, $routeParams, $location, $upload, Authentication, Girls, Videos) {
		// Auth binded to scope so the views will be able to use it as 
		// well
		$scope.authentication = Authentication;

		$scope.create = function() {
			// used title and type form fields to create new video resource
			var video = new Videos({
				title: this.title,
				type: this.type,
				creatorName: this.creatorName
			});
			$scope.$watch('filePath', function() {
				$scope.upload($scope.filePath);
			});
			$scope.upload = function(filePath){

				if (filePath.length) {
					$upload.upload({
						url: '/api/videos/',
						file: filePath,
						method: 'POST',
						headers: {
							'Content-Type': 'multipart/form-data'
						},
						data: data
					}).progress(function(e) {
						console.log(e);
					}).success(function(data, status, headers, config) {
						console.log('complete');
					});

				}
				
			};
			// used save method to send the new video object to
			// corresponding RESTful endpoint, along w/ two callbacks
			// first is when successful. it uses the location service
			// to navigate to the route that will present created article
			// second is when error occurs, callback assigns message to 
			// $scope object
			video.$save(function(response) {
				$location.path('/api/videos/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.loadOptions = function() {
			$scope.girls = Girls.query();	
		};

		// obtain a list
		$scope.find = function() {
			$scope.videos = Videos.query();
		};

		// obtain one by Id
		$scope.findOne = function() {
			$scope.video = Videos.get({
				videoId: $routeParams.videoId
			});
		};

		//update (PUT)
		$scope.update = function() {
			// used the resource video's $update() method
			$scope.video.$update(function() {
				$location.path('/videos/' + $scope.video._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		//delete (DELETE)
		$scope.delete = function(video) {
			// figure out whether deleting a video from list or from video view
			if (video) {
				video.$remove(function() {
					for (var i in $scope.videos) {
						if ($scope.videos[i] === video) {
							$scope.videos.splice(i, 1);
						}
					}
				});
			} else {
				$scope.video.$remove(function() {
					$location.path('/videos');
				});
			}
			// used the resource video's $update() method
		};
	}
]);