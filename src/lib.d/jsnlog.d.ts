/**
* Copyright 2014 Mattijs Perdeck.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

declare function JL(loggerName?: string): JL.JSNLogLogger;
declare module JL {

	interface JSNLogOptions {
		enabled?: boolean;
		maxMessages?: number;
		defaultAjaxUrl?: string;
		clientIP?: string;
		requestId?: string;
	}

	interface JSNLogFilterOptions {
		level?: number;
		ipRegex?: string;
		userAgentRegex?: string;
		disallow?: string;
	}

	interface JSNLogLoggerOptions extends JSNLogFilterOptions {
		appenders?: JSNLogAppender[];
		onceOnly?: string[];
	}

	// Base for all appender options types
	interface JSNLogAppenderOptions extends JSNLogFilterOptions {
		sendWithBufferLevel?: number;
		storeInBufferLevel?: number;
		bufferSize?: number;
		batchSize?: number;
	}

	interface JSNLogAjaxAppenderOptions extends JSNLogAppenderOptions {
		url?: string;
	}

	interface JSNLogLogger {
		setOptions(options: JSNLogLoggerOptions): JSNLogLogger;

		trace(logObject: any): JSNLogLogger;
		debug(logObject: any): JSNLogLogger;
		info(logObject: any): JSNLogLogger;
		warn(logObject: any): JSNLogLogger;
		error(logObject: any): JSNLogLogger;
		fatal(logObject: any): JSNLogLogger;
		fatalException(logObject: any, e: any): JSNLogLogger;
		log(level: number, logObject: any, e?: any): JSNLogLogger;
	}

	interface JSNLogAppender {
		setOptions(options: JSNLogAppenderOptions): JSNLogAppender;
	}

	interface JSNLogAjaxAppender extends JSNLogAppender {
		setOptions(options: JSNLogAjaxAppenderOptions): JSNLogAjaxAppender;
	}

	interface JSNLogConsoleAppender extends JSNLogAppender {
	}

	interface JSNLogStatic {
		(loggerName?: string): JSNLogLogger;

		setOptions(options: JSNLogOptions): JSNLogStatic;
		createAjaxAppender(appenderName: string): JSNLogAjaxAppender;

		getTraceLevel(): number;
		getDebugLevel(): number;
		getInfoLevel(): number;
		getWarnLevel(): number;
		getErrorLevel(): number;
		getFatalLevel(): number;
	}


    var enabled: boolean;
    var maxMessages: number;
    var defaultAjaxUrl: string;
    var clientIP: string;
    var requestId: string;
    function setOptions(options: JSNLogOptions): JSNLogStatic;
    function getAllLevel(): number;
    function getTraceLevel(): number;
    function getDebugLevel(): number;
    function getInfoLevel(): number;
    function getWarnLevel(): number;
    function getErrorLevel(): number;
    function getFatalLevel(): number;
    function getOffLevel(): number;
    class Exception {
        inner: any;
        name: string;
        message: string;
        constructor(data: any, inner: any);
    }
    class LogItem {
        l: number;
        m: string;
        n: string;
        t: number;
        constructor(l: number, m: string, n: string, t: number);
    }
    class Appender implements JSNLogAppender, JSNLogFilterOptions {
        appenderName: string;
        sendLogItems: (logItems: LogItem[]) => void;
        level: number;
        ipRegex: string;
        userAgentRegex: string;
        disallow: string;
        private sendWithBufferLevel;
        private storeInBufferLevel;
        private bufferSize;
        private batchSize;
        private buffer;
        private batchBuffer;
        constructor(appenderName: string, sendLogItems: (logItems: LogItem[]) => void);
        setOptions(options: JSNLogAppenderOptions): JSNLogAppender;
        /**
        Called by a logger to log a log item.
        If in response to this call one or more log items need to be processed
        (eg., sent to the server), this method calls this.sendLogItems
        with an array with all items to be processed.

        Note that the name and parameters of this function must match those of the log function of
        a Winston transport object, so that users can use these transports as appenders.
        That is why there are many parameters that are not actually used by this function.

        level - string with the level ("trace", "debug", etc.) Only used by Winston transports.
        msg - human readable message. Undefined if the log item is an object. Only used by Winston transports.
        meta - log object. Always defined, because at least it contains the logger name. Only used by Winston transports.
        callback - function that is called when the log item has been logged. Only used by Winston transports.
        levelNbr - level as a number. Not used by Winston transports.
        message - log item. If the user logged an object, this is the JSON string.  Not used by Winston transports.
        loggerName: name of the logger.  Not used by Winston transports.
        */
        log(level: string, msg: string, meta: any, callback: () => void, levelNbr: number, message: string, loggerName: string): void;
        private sendBatch();
    }
    class AjaxAppender extends Appender implements JSNLogAjaxAppender {
        private url;
        setOptions(options: JSNLogAjaxAppenderOptions): JSNLogAjaxAppender;
        sendLogItemsAjax(logItems: LogItem[]): void;
        constructor(appenderName: string);
    }
    class ConsoleAppender extends Appender implements JSNLogConsoleAppender {
        private clog(logEntry);
        private cerror(logEntry);
        private cwarn(logEntry);
        private cinfo(logEntry);
        private cdebug(logEntry);
        sendLogItemsConsole(logItems: LogItem[]): void;
        constructor(appenderName: string);
    }
    class Logger implements JSNLogLogger, JSNLogFilterOptions {
        loggerName: string;
        appenders: Appender[];
        onceOnly: string[];
        level: number;
        userAgentRegex: string;
        ipRegex: string;
        disallow: string;
        private seenRegexes;
        constructor(loggerName: string);
        setOptions(options: JSNLogLoggerOptions): JSNLogLogger;
        private buildExceptionObject(e);
        log(level: number, logObject: any, e?: any): JSNLogLogger;
        trace(logObject: any): JSNLogLogger;
        debug(logObject: any): JSNLogLogger;
        info(logObject: any): JSNLogLogger;
        warn(logObject: any): JSNLogLogger;
        error(logObject: any): JSNLogLogger;
        fatal(logObject: any): JSNLogLogger;
        fatalException(logObject: any, e: any): JSNLogLogger;
    }
    function createAjaxAppender(appenderName: string): JSNLogAjaxAppender;
    function createConsoleAppender(appenderName: string): JSNLogConsoleAppender;
    var __: Logger;
}
declare var exports: any;
declare var define: any;
