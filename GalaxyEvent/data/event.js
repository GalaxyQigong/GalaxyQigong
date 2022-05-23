(function ($) {
    $(function () {

        //年，月日，标题，内容，格式(green为加粗)

        var events = [
            [2015, "11.07", "<img src='static/h-ui/images/galaxy.png' width='38' height='38'>银河系气功组织宣告成立", "", ""],
            [2020, "5月", "<img src='data/img/person/chenxue.bmp' width='35' height='35'>尘雪西去", "痛失吾爱", "green"],
            [2020, "01.23", "<img src='data/img/person/jiongjionger.bmp' width='35' height='35'>新冠爆发", "武汉封城，桥洞侠在家数了俩月钱", ""],
            [2021, "09.09", "<img src='data/img/person/a8105.bmp' width='35' height='35'>99复活节，a8还阳日", "", ""],
            [2021, "09.10", "<img src='data/img/person/dh.bmp' width='35' height='35'>D神公开身份，竟是WXG接班人", "<img src='data/img/god-d.jpg' width='100' height='100' class='pic'/>", "green"],
            [2021, "11.05", "<img src='data/img/person/xjboss.bmp' width='35' height='35'>BOSS强势插入豹纹势力组织", "", ""],
            [2021, "11.07", "<img src='data/img/EDG-logo.png' width='35' height='35'>EDG夺冠", "两名群成员不幸被封", ""],
            [2022, "02.11", "<img src='data/img/person/xjboss.bmp' width='35' height='35'>BOSS从豹纹势力组织毕业", "", ""],
            [2022, "04.23", "<img src='data/img/person/a8105.bmp' width='35' height='35'>女装穿白丝", "", ""],
            [2022, "05.21", "<img src='data/img/person/srar.bmp' width='35' height='35'>研发niubi.asdj94jv01.xyz", "", ""],
        ];

        var mapYear = new Map();

        for(var eve of events) {
            var e = buildEvent(...eve);
            var map;
            if(mapYear.has(e.year)){
                map = mapYear.get(e.year);
            }else{
                map = new Map();
                mapYear.set(e.year, map);
            }
            map.set(e.date, e);
        }
        
        mapYear = sortMap(mapYear, false);
        
        var appendHtml = "";
        
        mapYear.forEach(function(yearEventsMap, year){
            appendHtml += '<div class="history-date"><ul><h2><a href="#nogo">' + year + '年</a></h2>';
            yearEventsMap = sortMap(yearEventsMap, false);
            yearEventsMap.forEach(function(eventsMap){
                appendHtml += '<li';
                if(eventsMap.titleFormat.length > 0){
                    appendHtml += ' class="' + eventsMap.titleFormat + '"';
                }
                appendHtml += '><h3>' + eventsMap.date + "<span>" + eventsMap.year + '</span></h3><dl><dt>' + eventsMap.title;
                if(eventsMap.detail.length > 0){
                    appendHtml += '<span>' + eventsMap.detail + '</span>';
                }
                appendHtml += '</dt></dl></li>';
            });
            appendHtml += "</ul></div>";
        });
        document.getElementById("history").innerHTML += appendHtml;
        
    });
  
    function buildEvent(year, date, title, detail, titleFormat){
        var Event = new Object();
        Event.year = year;
        Event.date = date;

        Event.title = title;
        Event.detail = detail;

        Event.titleFormat = titleFormat;
        return Event;
    }
  
    function sortMap(map, isKeyUpSort) {
        let keys = new Array()
        for (var key of map.keys()) {
            keys.push(key)
        }

        if (isKeyUpSort) {
            keys.sort(function(key1, key2) {
              return key1 - key2
            })
        } else {
            keys.sort(function(key1, key2) {
              return key2 - key1
            })
        }

        let newMap = new Map()
            keys.forEach(key => {
            newMap.set(key, map.get(key))
        })

        return newMap;
    }

})(jQuery);
