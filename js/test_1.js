var News = (function News() {
	var newsLink = 'news/news.php';
	$.getJSON(newsLink, loadNewsJson);
	
	function loadNewsJson(data, status) {
		var newsArticles = data;
		
		var minDate = Number.MAX_VALUE;
		var maxDate = 0;
		for(var i = 0; i < newsArticles.length; i++) {
			var article = newsArticles[i];
			var date = new Date(article.Date);
			article.date = date;
			article.unixTime = article.date.getTime();
			if(article.unixTime < minDate) {
				minDate = article.unixTime;
			}
			if(article.unixTime > maxDate){
				maxDate = article.unixTime;
			}
			var html = '';
			html += '<div class="date">'+ utils.monthNumToStr(date.getMonth()) + " " + date.getDate() +", " + date.getFullYear() + '</div>';
			html += '<div class="source">'+ article.Source + '</div>';
			html += '<div class="title"><a href="' + article.Url + '" title="'+ article.Description + '" target="_blank">' 
				+ article.Title.replace('work','') + '</a></div>';
			
			article.html = html;
		}
		
		var articleEles = d3.select('.news .content').selectAll('.article').data(newsArticles);
		articleEles.enter().append('div').attr('class',function(d,i) {
			var cl = 'article article' + i;
			if(Math.random() < 0.2) {
			//	cl += ' articleTwoCol';
			} else if(Math.random() < 0.1) {
			//	cl += ' articleThreeCol';
			}
			
			return cl;
		})
		articleEles.html(function(d) {
			return d.html;
		})
		
		var opacityScale = d3.scale.linear().domain([0,newsArticles.length]).range([1,0.5]);
		articleEles.style('background-color',function(d,i) {
			var opacity = opacityScale(i);
			return 'rgba(255,0,0, ' + opacity + ')';
		})
		
		$('.news .content').masonry({
			itemSelector: '.article',
			columnWidth: 312
		});
		
		
	}
	
	var api = {};
	return api;
}());