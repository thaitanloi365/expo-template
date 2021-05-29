import {useEffect, useState, useCallback} from 'react';
import {LayoutChangeEvent, LayoutRectangle} from 'react-native';
import {AppDispatch, RootState} from '@Store/Store';
import isEqual from 'react-fast-compare';
import {useSelector as useReduxSelector, useDispatch as useReduxDispatch, TypedUseSelectorHook} from 'react-redux';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import {useAsync} from 'react-async-hook';
import useConstant from 'use-constant';

const customSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export function useSelector<T>(selector: (state: RootState) => T, equalityFn = isEqual): T {
  const state = customSelector(x => x, equalityFn);
  return selector(state);
}

export const useDispatch = () => useReduxDispatch<AppDispatch>();

export const useLayout = (): [LayoutRectangle | null, (event: LayoutChangeEvent) => void] => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const onLayout = useCallback(event => {
    setLayout(event.nativeEvent.layout);
  }, []);

  return [layout, onLayout];
};

export function useCountdown(initialValue = 200, interval = 1000): [number, boolean, (v: number) => void] {
  const [timeLeft, setTimeLeft] = useState(initialValue);
  const [completed, setCompleted] = useState(initialValue <= 0);

  useEffect(() => {
    if (!timeLeft) {
      setCompleted(true);
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, interval);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const reset = (v: number) => {
    setTimeLeft(v);
    setCompleted(false);
  };

  return [timeLeft, completed, reset];
}

export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async data => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors) {
        return {
          values: {},
          errors: errors.inner?.reduce(
            (allErrors: any, currentError: any) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? 'validation',
                message: currentError.message,
              },
            }),
            {},
          ),
        };
      }
    },
    [validationSchema],
  );

export const useDebouncedSearch = (searchFunction: (text: string) => Promise<any>) => {
  const [inputText, setInputText] = useState('');

  const debouncedSearchFunction = useConstant(() => AwesomeDebouncePromise(searchFunction, 300));

  const searchResults = useAsync(async () => {
    if (inputText.length === 0) {
      return [];
    } else {
      return debouncedSearchFunction(inputText);
    }
  }, [debouncedSearchFunction, inputText]);

  return {
    inputText,
    setInputText,
    searchResults,
  };
};
