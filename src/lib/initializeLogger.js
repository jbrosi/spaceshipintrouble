var consoleAppender = JL.createConsoleAppender('consoleAppender');
JL().setOptions({
    "appenders": [consoleAppender]
});
JL("Spaceship in Trouble").info("*** Logger initialized ***");


JL("Init").info("*** "+ ( isDebug ? "Debug" : "Release" ) +" mode Detected ***");


