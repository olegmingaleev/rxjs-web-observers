import {Observable} from "rxjs";

export const fromIntersection = (
    target: Element,
    options?: IntersectionObserverInit,
): Observable<readonly IntersectionObserverEntry[]> =>
    new Observable(observer => {
        const intersectionObserver = new IntersectionObserver(entries => {
            observer.next(entries);
        }, options);

        intersectionObserver.observe(target);

        return () => {
            intersectionObserver.disconnect();
        };
    });
