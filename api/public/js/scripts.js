(function(){
	var problems = {
		get : function(){
			var defer = $.Deferred();
			var xhr = $.ajax({
				method : 'get',
				url : '/game'
			});

			xhr.done(function(res){
				defer.resolve(res);
			});
			xhr.fail(function(){
				defer.reject();
			});
			return defer;
		},
		answer : function(){

		}
	};

	var init = function(){
		//grab the questions and display the first
		problems.get().then(function(res){
			console.log(res)
			$('#quiz').html(res);
		});
	};

	$(function(){
		console.debug("ready")
		init();
	});
}());