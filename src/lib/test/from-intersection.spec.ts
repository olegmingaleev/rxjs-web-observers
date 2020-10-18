import 'intersection-observer';
import {Observable} from 'rxjs';
import {first} from 'rxjs/operators';

import {fromIntersection} from '../from-intersection';

describe('fromIntersection', () => {
    const target = document.createElement('div');
    const observer$ = fromIntersection(target, {
        root: document.body,
    });

    it('should be instance of Observable', () => {
        expect(observer$).toBeInstanceOf(Observable);
    });

    it('subscribe to intersection of element', done => {
        observer$.pipe(first()).subscribe(([entry]) => {
            expect(entry.target).toEqual(target);

            done();
        });

        document.body.appendChild(target);
    });

    it('unsubscribe from intersection of element', done => {
        const target = document.createElement('div');

        fromIntersection(target, {
            root: document.body,
        })
            .subscribe(() => {
                fail();
            })
            .unsubscribe();

        setTimeout(done, 100);
    });
});
