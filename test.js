function getCovid() {
  var simpleResult = org.jsoup.Jsoup.connect("http://ncov.mohw.go.kr/#link").ignoreContentType(true).get().select("#main_maplayout > button > span");
  var simpleResultString = "";
  for (var i = 0; i < simpleResult.size(); i++) {
    if (i % 3 == 0) {
        simpleResultString += "지역: ";
        simpleResultString += simpleResult.get(i).text() + "\n";
    }
    if (i % 3 == 1) {
        simpleResultString += "누적 확진환자: ";
        simpleResultString += simpleResult.get(i).text() + "\n";
    }
    if (i % 3 == 2) {
        simpleResultString += "전일 대비 증감: ";
        simpleResultString += simpleResult.get(i).text() + "\n\n";
    }
  }
  Bot.send("시도별 확진환자 현황" + "\u200b".repeat(500) + "\n\n\n" + simpleResultString);
}
function response(room,sender,msg,isGroupChat) {
  if(msg=="/코로나_js") {
    Bot.runOnNewThread("getCovid");
  } else if(msg.split(" ")[0]=="_exec") {
    eval(msg.replace("_exec ",""));
  }
}
