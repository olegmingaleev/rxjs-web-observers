import {Observable} from 'rxjs';

export const fromMutation = (
    target: Node,
    options?: MutationObserverInit,
): Observable<readonly MutationRecord[]> =>
    new Observable(observer => {
        const mutationObserver = new MutationObserver(mutations => {
            observer.next(mutations);
        });

        mutationObserver.observe(target, options);

        return () => {
            mutationObserver.disconnect();
        };
    });
