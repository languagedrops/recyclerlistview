"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ScrollEventNormalizer = /** @class */ (function () {
    function ScrollEventNormalizer(target, distanceFromWindow) {
        this.divEvent = {
            nativeEvent: {
                contentOffset: {
                    get x() {
                        return target.scrollLeft;
                    },
                    get y() {
                        return target.scrollTop;
                    },
                },
                contentSize: {
                    get height() {
                        return target.scrollHeight;
                    },
                    get width() {
                        return target.scrollWidth;
                    },
                },
                layoutMeasurement: {
                    get height() {
                        return target.offsetHeight;
                    },
                    get width() {
                        return target.offsetWidth;
                    },
                },
            },
        };
        this.windowEvent = {
            nativeEvent: {
                contentOffset: {
                    get x() {
                        return window.scrollX - distanceFromWindow;
                    },
                    get y() {
                        return window.scrollY - distanceFromWindow;
                    },
                },
                contentSize: {
                    get height() {
                        return target.offsetHeight;
                    },
                    get width() {
                        return target.offsetWidth;
                    },
                },
                layoutMeasurement: {
                    get height() {
                        return window.innerHeight;
                    },
                    get width() {
                        return window.innerWidth;
                    },
                },
            },
        };
    }
    return ScrollEventNormalizer;
}());
exports.ScrollEventNormalizer = ScrollEventNormalizer;
//# sourceMappingURL=ScrollEventNormalizer.js.map