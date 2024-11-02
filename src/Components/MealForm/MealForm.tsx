import React, { useEffect, useState } from 'react';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';
import { mealTime } from '../../constants.ts';
import { IForm } from '../../types';
import { toast } from 'react-toastify';

const initialForm = {
  description: '',
  category: '',
  calories: 0,
};

interface Props {
  isEdit?: boolean;
  isLoading?: boolean;
  submitForm: (meal: IForm) => void;
  mealToEdit?: IForm;
}

const MealForm: React.FC<Props> = ({isEdit, submitForm, isLoading, mealToEdit}) => {
  const [form, setForm] = useState({...initialForm});

  useEffect((): void => {
    if (mealToEdit) {
      setForm((prevState: IForm): IForm => ({
        ...prevState,
        ...mealToEdit,
      }));
    }
  }, [mealToEdit]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  };

  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!form.description.trim() || !form.category || !form.calories) {
      toast.warning('Please fill out all fields.');
      return;
    }

    submitForm({...form});

    if (!mealToEdit) {
      setForm({...initialForm});
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitForm}>
        <div className="mb-3">
          <h2 className="text-center mb-4">{isEdit ? 'Edit meal' : 'Add new meal'}</h2>
          <select
            required
            className="form-select"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="" disabled>Select meal time</option>
            {mealTime.map((meal: { id: string; title: string; }) => (
              <option key={meal.id} value={meal.id}>
                {meal.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
            <textarea
              required
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Meal description:"
              className="form-control"
            />
        </div>

        <div className="mb-3">
          <input
            required
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
            placeholder="Calories:"
            className="form-control"
          />
        </div>

        <ButtonLoading
          type="submit"
          text={isEdit ? 'Edit' : 'Add'}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </form>
    </div>
  );
};

export default MealForm;