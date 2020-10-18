import {Observable, Subscription} from 'rxjs';

import {fromResize} from '../from-resize';

// Prepare JSDOM
const getOffsetValue = function (el: Element): number {
    const style = getComputedStyle(el);
    const width = parseFloat(style.width || '');
    const height = parseFloat(style.height || '');

    if (style.display === 'none' || (!width && !height)) {
        return 0;
    }

    return 1;
};

Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
    get: function (): number {
        return getOffsetValue(this);
    },
});

Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
    get: function (): number {
        return getOffsetValue(this);
    },
});

describe('fromResize', () => {
    let el: HTMLElement;
    let subscription: Subscription | undefined;

    beforeAll(done => {
        if (!window.ResizeObserver) {
            import('@juggle/resize-observer')
                .then(m => m.ResizeObserver)
                .then(ResizeObserverPolyfill => {
                    window.ResizeObserver =
                        window.ResizeObserver || ResizeObserverPolyfill;

                    done();
                });
        } else {
            done();
        }
    });

    beforeEach(done => {
        el = document.createElement('div');
        el.style.width = '100px';

        document.body.appendChild(el);
        requestAnimationFrame(() => done());
    });

    afterEach(() => {
        while (document.body.firstElementChild) {
            document.body.removeChild(document.body.firstElementChild);
        }

        if (subscription) {
            subscription.unsubscribe();

            subscription = undefined;
        }
    });

    describe('should be instance of Observable', () => {
        it('called without options', () => {
            expect(fromResize(el)).toBeInstanceOf(Observable);
        });

        it('called with options', () => {
            expect(
                fromResize(el, {
                    box: 'border-box',
                }),
            ).toBeInstanceOf(Observable);
        });
    });

    describe('subscribe to resize of element', () => {
        it('without options', done => {
            subscription = fromResize(el).subscribe(([entry]) => {
                expect(entry.target).toEqual(el);
                done();
            });
        });

        it('with options', done => {
            subscription = fromResize(el, {
                box: 'border-box',
            }).subscribe(([entry]) => {
                expect(entry.target).toEqual(el);
                done();
            });
        });
    });

    it('unsubscribe from resize observer', done => {
        fromResize(el)
            .subscribe(() => {
                fail('Should be unsubscribed');
            })
            .unsubscribe();

        setTimeout(done, 100);
    });
});
