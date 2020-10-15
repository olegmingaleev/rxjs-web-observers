import {Observable} from 'rxjs';

export const fromResize = (
    target: Element,
    options?: ResizeObserverOptions,
): Observable<ReadonlyArray<ResizeObserverEntry>> =>
    new Observable(observer => {
        const resizeObserver = new ResizeObserver(entries => {
            observer.next(entries);
        });

        resizeObserver.observe(target, options);

        return () => {
            resizeObserver.disconnect();
        };
    });
