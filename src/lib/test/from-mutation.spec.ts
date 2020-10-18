import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import {fromMutation} from '../from-mutation';

describe('fromMutation', () => {
    const observedEl = document.body;
    const observer$ = fromMutation(observedEl, {
        childList: true,
    });

    it('should be instance of Observable', () => {
        expect(observer$).toBeInstanceOf(Observable);
    });

    it('subscribe to element mutations and handle single of them', done => {
        observer$.pipe(first()).subscribe(([mutation]) => {
            expect(mutation).toBeInstanceOf(MutationRecord);
            expect(mutation.addedNodes).toBeTruthy();

            done();
        });

        const el = document.createElement('div');

        observedEl.appendChild(el);
    });

    it('unsubscribe from element mutations', done => {
        observer$
            .subscribe(() => {
                fail('Should be unsubscribed');
            })
            .unsubscribe();

        const el = document.createElement('div');

        observedEl.appendChild(el);

        setTimeout(done, 100);
    });
});
