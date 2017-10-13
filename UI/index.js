
$(document).ready(function() {
    nlp = window.nlp_compromise;

    var messages = [], //array that hold the record of each string in chat
        lastUserMessage = "", //keeps track of the most recent input string from the user
        botMessage = "", //var keeps track of what the chatbot is going to say
        botName = 'Chatbot', //name of the chatbot
        talking = true; //when false the speach function doesn't work

    function chatbotResponse(response) {
        console.log(response);
        var div = "<div><p class='chat-p'>"+response.pretext+"</p><p class='chat-p'>"+response.mainText+"</p><p class='chat-p'>"+response.postText+"</p></div>";
        pushIntoChatBox(div, false);
    }

    function pushIntoChatBox(message, isUser) {
        var user = 'bot';
        if (isUser) {
            user = 'user';
        } 
        var div = "<div class='"+user+"'>"+message+"</div>";
        $("#messagebox").append(div);
    }

    function newEntry() {
        if (document.getElementById("chatbox").value != "") {
            lastUserMessage = document.getElementById("chatbox").value;

            //push into chatbox
            pushIntoChatBox(lastUserMessage, true);

            //construct request
            var request = {
                message : lastUserMessage
            }
            //make ajax call to fetch data
            makeAjaxCall(request);

            //reset chat box
            document.getElementById("chatbox").value = ""; 
        }
    }

    function makeAjaxCall(request) {
        $.ajax({
            url : "http://localhost:8080/search",
            type : "POST",
            contentType: "application/json; charset=utf-8",
            data : JSON.stringify(request),
            success : function(response) {
                chatbotResponse(response);
            }
        })

    }

    function Speech(say) {
        if ('speechSynthesis' in window && talking) {
            var utterance = new SpeechSynthesisUtterance(say);
            speechSynthesis.speak(utterance);
        }
    }


    $("#submit").on('click', keyPress)

    $(document).keypress(function(e) {
        if(e.which == 13) {
            newEntry();
        }
    });


    function keyPress(e) {
        newEntry()
    }

    pushIntoChatBox("Hi, I am your Legal Virtual Assistant. How may I help you today?", false);

});
