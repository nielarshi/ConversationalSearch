
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
        pushIntoChatBox(div, false, true);
    }

    function pushIntoChatBox(message, isUser, ifValidResult) {
        var user = 'bot';
        if (isUser) {
            user = 'user';
        } 

        var helpfulMsg;
        if (user == 'bot') {
            helpfulMsg = "<div class='helpful-msg'><span style='verticle-align:\"super\"'>Did the above response help you? </span><span class='helpful-yes'><img src='yes.png'></img></span><span class='helpful-no'><img src='no.png'></img></span></div>"
        };
        var div = "<div class='"+user+"'>"+message+"</div>";
        $("#messagebox").append(div);
        if (helpfulMsg && ifValidResult) {
            $("#messagebox").append(helpfulMsg);
        };
        $("#messagebox").animate({ scrollTop: $('#messagebox').prop("scrollHeight")}, 1000);
    }

    $(document).on('click', ".helpful-yes", function() {
        pushIntoChatBox("Thank you! Good to know about it. Your responses help to me to learn better.", false);
    })
    $(document).on('click',".helpful-no", function() {
        pushIntoChatBox("Sorry to hear about it. I will try to be better next time. Your responses are very valuable.", false);
    })

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
        } else {

            pushIntoChatBox("I am sorry, I think you missed typing the question. Let me know what's there on your mind.", false);
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
            },
            error : function(error) {
                lastUserMessage = "My creators are currently taking my class and teaching me new ways to help you. <br/>I would be ready to help you in some time.";
                pushIntoChatBox(lastUserMessage, false);
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

    $("#mic").on('click', startDictation);

    function startDictation() {

    if (window.hasOwnProperty('webkitSpeechRecognition')) {

      var recognition = new webkitSpeechRecognition();

      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = function(e) {
        document.getElementById('chatbox').value
                                 = e.results[0][0].transcript;
        recognition.stop();
      };

      recognition.onerror = function(e) {
        recognition.stop();
      }

    }
  }

  $("#box-header").on('click', function() {
    $('.input').toggle();
    $('#mainPreSearchFilters').toggle();
    $('#mainPreSearchFilters').parent().toggle();
    $('#messagebox').toggle();
    $('#chatborder').toggle();
    if ($('#bodybox').height() == 50) {
        $('#bodybox').height(550);
    } else {
        $('#bodybox').height(50);
    }
    
  });

  $("#box-header").click();

    pushIntoChatBox("Hi, I am your Legal Virtual Assistant. How may I help you today?", false);

});
