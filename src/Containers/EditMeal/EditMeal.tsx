import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IForm, IMeal } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { toast } from 'react-toastify';
import MealForm from '../../Components/MealForm/MealForm.tsx';

const EditMeal = () => {
  const [meal, setMeal] = useState<IMeal>();
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const params = useParams<{ mealId: string }>();

  const fetchData: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      setEditLoading(true);
      const response: { data: IMeal } = await axiosApi<IMeal>(
        `/meals/${params.mealId}.json`,
      );
      if (response.data) setMeal(response.data);
    } catch (e) {
      console.error(e);
      toast.error('Editing was declined');
    } finally {
      setEditLoading(false);
    }
  }, [params.mealId]);

  const submitForm: (meal: IForm) => Promise<void> = async (meal: IForm): Promise<void> => {
    try {
      if (params.mealId) {
        setEditLoading(true);
        await axiosApi.put(`/meals/${params.mealId}.json`, {...meal});
        navigate('/');
        toast.success('Edited successfully');
      }
    } catch (e) {
      console.error(e);
      toast.error('Editing was declined');
    } finally {
      setEditLoading(false);
    }
  };

  useEffect((): void => {
    if (params.mealId) {
      void fetchData();
    }
  }, [params.mealId, fetchData]);

  return (
    <>
      <MealForm submitForm={submitForm} isLoading={editLoading} mealToEdit={meal} isEdit={true}/>
    </>
  );
};

export default EditMeal;