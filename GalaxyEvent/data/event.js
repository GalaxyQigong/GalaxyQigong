(function ($) {
    $(function () {

        buildParser();
        
        //年，月日，标题，内容，格式(green为加粗)

        var events = [
            [2015, "11.07", "<img src='static/h-ui/images/galaxy.png' width='38' height='38'>银河系气功组织宣告成立", "", ""],
            [2020, "5月", "[avatar:person/chenxue.bmp]尘雪西去", "痛失吾爱", "green"],
            [2020, "01.23", "[avatar:person/jiongjionger.bmp]新冠爆发", "武汉封城，桥洞侠在家数了俩月钱", ""],
            [2021, "09.09", "[avatar:person/a8105.bmp]99复活节，a8还阳日", "", ""],
            [2021, "09.10", "[avatar:person/dh.bmp]D神公开身份，竟是WXG接班人", "[pic:god-d.jpg|width:100|height:100|class:pic]", "green"],
            [2021, "11.05", "[avatar:person/xjboss.bmp]BOSS强势插入豹纹势力组织", "", ""],
            [2021, "11.07", "[avatar:EDG-logo.png]EDG夺冠", "两名群成员不幸被封", ""],
            [2022, "02.11", "[avatar:person/xjboss.bmp]BOSS从豹纹势力组织毕业", "", ""],
            [2022, "04.23", "[avatar:person/a8105.bmp]女装穿白丝", "", ""],
            [2022, "05.21", "[avatar:person/srar.bmp]研发[a:[h2:niubi.asdj94jv01.xyz]|href:https://www.baidu.com|target:_blank]", "", ""],
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
    var mapParser = new Map();
  
    function buildEvent(year, date, title, detail, titleFormat){
        var Event = new Object();
        Event.year = year;
        Event.date = date;

        Event.title = parse(title);
        Event.detail = parse(detail);

        Event.titleFormat = titleFormat;
        return Event;
    }

    function buildParser(){
        mapParser.set("avatar", function(value){
            return "<img src='data/img/" + this.value + "' width='35' height='35'>";
        });
        mapParser.set("pic", function(value){
            return "<img src='data/img/" + this.value + "'>";
        });
    }
    
    function parse(str){
        var pos1 = str.lastIndexOf("[") + 1;
        if(pos1 == 0) return str;
        var pos2 = str.indexOf("]", pos1);
        var find = str.substr(pos1, pos2 - pos1);
        var kv = tinySplit(find, "|", 2);
        var argsMap = parseArgsMap(kv[1]);
        kv = kv[0].split(":");

        var convert = "";
        argsMap.forEach(function(value, key){
            convert += " " + key + "=" + "'" + value + "'";
        });
        var parser = mapParser.get(kv[0]);
        if(parser == null){
            convert = "<" + kv[0] + convert + ">" + kv[1] + "</" + kv[0] + ">";
        }else{
            if(convert.length > 0){
                convert = parser(kv[1] + "'" + convert.substr(0, convert.length - 1));
            }else{
                convert = parser(kv[1]);
            }
        }
        return parse(str.replace("[" + find + "]", convert));
    }

    function parseArgsMap(str){
        var argsMap = new Map();
        if(str == null || str == "") return argsMap;
        var args = str.split("|");
        for(var arg of args){
            arg = tinySplit(arg, ":", 2);
            if(arg.length == 2){
                argsMap.set(arg[0], arg[1]);
            }
        }
        return argsMap;
    }

    function tinySplit(str, spec, count){
        var arr = str.split(spec);
        if(arr.length > count){
            return [arr.shift(), arr.join(spec)];
        }
        return arr;
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
