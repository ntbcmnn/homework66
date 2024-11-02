import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IMeal, IMealApi } from '../../types';
import axiosApi from '../../axiosApi.ts';
import Meal from '../../Components/Meal/Meal.tsx';
import { toast } from 'react-toastify';
import Loader from '../../Components/UI/Loader/Loader.tsx';

const Home = () => {
  const [meals, setMeals] = useState<IMeal[]>([]);
  const [totalCalories, setTotalCalories] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [deletingMealId, setDeletingMealId] = useState<string | null>(null);
  const params = useParams<{ mealId: string }>();
  const navigate = useNavigate();

  const fetchData: () => Promise<void> = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      const response: {
        data: IMealApi
      } = await axiosApi.get<IMealApi>('/meals.json');

      if (response.data) {
        const mealsApi: IMeal[] = Object.keys(response.data).map(
          (mealKey: string): IMeal => {
            return {
              ...response.data[mealKey],
              id: mealKey,
            };
          },
        );
        setMeals(mealsApi.reverse());

        const totalKCal: number = mealsApi.reduce((acc: number, meal: IMeal): number => {
          acc += Number(meal.calories);
          return acc;
        }, 0);

        setTotalCalories(totalKCal);
      }
    } catch (e) {
      setLoading(false);
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteMeal: (id: string) => Promise<void> = async (id: string): Promise<void> => {
    try {
      setDeletingMealId(id);
      await axiosApi.delete(`/meals/${id}.json`);
      setMeals((prevState: IMeal[]): IMeal[] => prevState.filter((meal: IMeal): boolean => meal.id !== id));
      setTotalCalories((prevState: number): number => {
          const deletedMeal: IMeal | undefined = meals.find((meal: IMeal): boolean => meal.id === id);
          if (deletedMeal) {
            return prevState - deletedMeal.calories;
          }
          return 0;
        }
      );
      navigate('/');
      toast.success('Deleted successfully');
    } catch (e) {
      toast.error('Deleting declined');
      console.error(e);
    } finally {
      setDeletingMealId(null);
    }
  };

  useEffect((): void => {
    void fetchData();
  }, [fetchData, params.mealId]);

  return (
    <>
      {loading ? <Loader/> :
        <>
          <div className="d-flex justify-content-between align-items-center gap-3 mb-5">
            <h5
              className="text-light d-inline-block bg-dark px-3 py-2 rounded-2"
            >
              Total: {totalCalories} kcal
            </h5>

            <Link to="/home/add" className="text-light">
              <button type="button" className="btn btn-dark">
                Add a meal
              </button>
            </Link>
          </div>

          {meals.length > 0 ?
            <>
              {meals.map((meal: IMeal) => (
                <Meal
                  meal={meal}
                  key={meal.id}
                  onDelete={(): Promise<void> => deleteMeal(meal.id)}
                  isLoading={deletingMealId === meal.id}
                />
              ))}
            </> : <h2 className="text-center">No meals found</h2>
          }
        </>
      }
    </>
  );
};

export default Home;