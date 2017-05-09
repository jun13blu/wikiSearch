$(function(){
    var wikigoo = (function(){
        //cache dom
        var $search = $(".search");
        var $searchField = $search.find("input");
        var $searchCancel = $search.find("#cancel");
        var $resultField = $(".results");
        var $body = $("body");

        //variables
        var searchText;
        var resultList;

        //bind events
        function bind(){
            $search.on("mouseenter", peek);
            $search.on("mouseleave", hide);
            $search.on("click", expand);
            $searchCancel.on("click", shrink);
        }
        bind();

        //peek search field
        function peek(){
            $searchField.removeClass("hidden");
        }

        //hide search field
        function hide(){
            $searchField.addClass("hidden");
        }

        //expand search field
        function expand(){
            $searchField.addClass("expanded").on("keyup", lookup);
            $search.addClass("expanded");
            $searchCancel.removeClass("hidden");
        }

        //shrink search field
        function shrink(){
            $resultField.text("");
            $searchField.val("");
            $search.off();
            $searchField.removeClass("expanded").addClass("hidden").off();
            $search.removeClass("expanded");
            $searchCancel.addClass("hidden");
            $searchField.on("transitionend", bind);
        }

        //lookup
        function lookup(){
            var query = $searchField.val();
            if(query){
                console.log(query);
                $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search=" + query + "&limit=10&namespace=0&origin=*&format=json", function(data){
                    resultList = data;
                    update();
                });
            }
            else{
                $resultField.text("");
            }
        }

        //update
        function update(){
            $resultField.text("");
            var length = resultList[1].length;
            for(var i = 0; i < length; i++){
                $resultField.append("<a href='" + resultList[3][i] + "' target='_blank'><div class='link'><h2>" + resultList[1][i] + "</h2><p>" + shorten(resultList[2][i]) + "</p></div></a>");
            }
        }

        //shorten
        function shorten(string){
            if(string.length > 100){
                return string.substring(0, 97) + "...";
            }
            else{
                return string;
            }
        }

    })();
});