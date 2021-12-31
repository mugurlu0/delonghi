/* Polyfill indexOf. */
var indexOf;

if (typeof Array.prototype.indexOf === 'function') {
    indexOf = function (haystack, needle) {
        return haystack.indexOf(needle);
    };
}
else {
    indexOf = function (haystack, needle) {
        var i = 0, length = haystack.length, idx = -1, found = false;
        while (i < length && !found) {
            if (haystack[i] === needle) {
                idx = i;
                found = true;
            }
            i++;
        }
        return idx;
    };
}
/* Polyfill EventEmitter. */
var EventEmitter = function () {
    this.events = {};
};

EventEmitter.prototype.on = function (event, listener) {
    if (typeof this.events[event] !== 'object') {
        this.events[event] = [];
    }
    this.events[event].push(listener);
};
EventEmitter.prototype.removeListener = function (event, listener) {
    var idx;

    if (typeof this.events[event] === 'object') {
        idx = indexOf(this.events[event], listener);

        if (idx > -1) {
            this.events[event].splice(idx, 1);
        }
    }
};
EventEmitter.prototype.emit = function (event) {
    var i, listeners, length, args = [].slice.call(arguments, 1);

    if (typeof this.events[event] === 'object') {
        listeners = this.events[event].slice();
        length = listeners.length;

        for (i = 0; i < length; i++) {
            listeners[i].apply(this, args);
        }
    }
};
EventEmitter.prototype.once = function (event, listener) {
    this.on(event, function g() {
        this.removeListener(event, g);
        listener.apply(this, arguments);
    });
};

var queueJobs = [];
window.EnableCarouselDataLayerSupport = function (carouselElement, callback) {
    console.log('EnableCarouselDataLayerSupport for ========>>>' + carouselElement);
    var executeJob = function () {
        var carousels = $(carouselElement);
        if (carousels.length) {
            carousels.each(function () {
                var $car = $(this);
                var items = $car.find('[' + CommonConstants.DATALAYER_DISABLED + ']');
                if (items.length) {
                    items.each(function () {
                        this.removeAttribute(CommonConstants.DATALAYER_DISABLED);
                    });
                }
                $car.removeAttr(CommonConstants.DATALAYER_DISABLED);
            });
        }

        if (callback) callback();
        window.ImpressionScanner();
    };
    if (window.DisabledDataLayer) {
        executeJob();
    }
    else {
        queueJobs.push({ job: executeJob, executed: false });
    }
    var jobInterval = setInterval(function () {       
        if (!window.DisabledDataLayer) return;
        var hasWaitingJobs = queueJobs.some(function (e) { return e.executed === false; });
        if (!hasWaitingJobs) { clearInterval(jobInterval); return; }

        if (queueJobs.length) {
            queueJobs.forEach(function (qJob) {
                if (!qJob.executed) { qJob.job(); qJob.executed = true;}
            });
        }        
    }, 500);

};
var CommonConstants = {
    CLICKABLE_ATTR: "datalayer-clickable",
    DATALAYER_DISABLED: "datalayer-disabled"
};


var carouselInitialized = new EventEmitter('CarouselInitialized');
carouselInitialized.on('CarouselInitialized', window.EnableCarouselDataLayerSupport);


