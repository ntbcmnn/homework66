import MealForm from '../../Components/MealForm/MealForm.tsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { IForm } from '../../types';
import axiosAPI from '../../axiosApi.ts';
import { toast } from 'react-toastify';

const Add = () => {
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitForm: (meal: IForm) => Promise<void> = async (meal: IForm): Promise<void> => {
    try {
      setAddLoading(true);
      await axiosAPI.post('/meals.json', {...meal});
      navigate('/');
      toast.success('Added successfully');
    } catch (e) {
      console.error(e);
      toast.error('Adding was declined');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <>
      <MealForm submitForm={submitForm} isLoading={addLoading}/>
    </>
  );
};

export default Add;
