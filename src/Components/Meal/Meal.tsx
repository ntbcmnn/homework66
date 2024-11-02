import React from 'react';
import { IMeal } from '../../types';
import { Link } from 'react-router-dom';
import ButtonLoading from '../UI/ButtonLoading/ButtonLoading.tsx';

interface Props {
  meal: IMeal;
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

const Meal: React.FC<Props> = ({meal, onDelete, isLoading}) => {
  return (
    <div className="d-flex flex-column align-items-center">
      {meal ?
        <div className="card mb-4 bg-dark text-white border-0 p-3 w-75">
          <div className="card-body d-flex flex-column gap-1">
            <p className="card-text text-light fw-bold text-uppercase">{meal.category}</p>
            <hr className="border-white border-1 opacity-100"/>
            <h5 className="card-title">{meal.description}</h5>
            <p className="card-text">{meal.calories} kcal</p>
            <div className="d-flex gap-3 justify-content-end mt-4">
              <ButtonLoading
                isLoading={isLoading}
                isDisabled={isLoading}
                type="button"
                text={<i className="bi bi-trash3"></i>}
                className="border-white fs-5"
                onClick={(): void => onDelete(meal.id)}
              />
              <Link
                to={`/home/${meal.id}/edit`}
                className="btn btn-dark border-white fs-5 border-white"
              >
                <i className="bi bi-pen"></i>
              </Link>
            </div>
          </div>
        </div>
        : <p className="text-center">No meals found</p>
      }
    </div>
  );
};

export default Meal;