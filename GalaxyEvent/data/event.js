(function ($) {
    $(function () {

        console.log("633");
        var events = [
            [2015, "11.07", "<img src='static/h-ui/images/galaxy.png' width='38' height='38'>银河系气功组织宣告成立", "", ""],
            [2020, "5月", "<img src='data/img/chenxue.bmp' width='35' height='35'>尘雪西去", "痛失吾爱", "green"],
            [2021, "09.09", "99复活节，a8还阳日", "", ""],
            [2021, "09.10", "D神公开身份，竟是WXG接班人", "<img src='data/img/god-d.jpg' width='100' height='100' class='pic'/>", "green"],
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
                if(eventsMap.color.length > 0){
                    appendHtml += ' class="' + eventsMap.color + '"';
                }
                appendHtml += '><h3>' + eventsMap.date + "<span>" + eventsMap.year + '</span></h3><dl><dt>' + eventsMap.title;
                if(eventsMap.detail.length > 0){
                    appendHtml += '<span>' + eventsMap.detail + '</span>';
                }
                appendHtml += '</dt></dl></li>';
            });
            appendHtml += "</ul></div>";
            //document.getElementById("history").innerHTML+= appendHtml;
            //addDom(yearEventsMap);
        });
        document.getElementById("history").innerHTML += appendHtml;
        
        //map = sortMap(map, false);
        
        console.log("over");
    });
    
    function addDom(eve){
        
    }
  
    function buildEvent(year, date, title, detail, color){
        var Event = new Object();
        Event.year = year;
        Event.date = date;
        Event.id = year.toString() + date.toString();

        Event.title = title;
        Event.detail = detail;

        Event.color = color;
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