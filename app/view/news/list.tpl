<html>
<head>
    <title>Hacker News</title>
    <link rel="stylesheet" href="/public/css/news.css" />
</head>
<body>
<div class="news-view view">
<div>{{list}}</div>
    {% for item in list %}
    <div class="item">
        <a href="{{ item.url }}">{{ item.title }}</a>
    </div>
    {% endfor %}
</div>
</body>
</html>