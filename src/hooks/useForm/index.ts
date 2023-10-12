import { useReducer, useCallback } from 'react';

type FieldValues = {
  [key: string]: string | number | readonly string[] | undefined;
};

type FormProps = {
  initialValues?: FieldValues;
  onSubmit: (values: FieldValues) => void;
};

type Action = {
  type: 'CHANGE';
  payload: {
    name: string;
    value: string | number | readonly string[] | undefined;
  };
};

type Reducer<S, A> = (prevState: S, action: A) => S;

const formReducer: Reducer<FieldValues, Action> = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      const { name, value } = action.payload;
      return { ...state, [name]: value };
    default:
      return state;
  }
};

type UseFormReturn = {
  values: FieldValues;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const useForm = ({
  initialValues = {},
  onSubmit,
}: FormProps): UseFormReturn => {
  const [values, dispatch] = useReducer(formReducer, initialValues);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({ type: 'CHANGE', payload: { name, value: value } });
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(values);
    },
    [onSubmit, values]
  );

  return { values, handleChange, handleSubmit };
};
