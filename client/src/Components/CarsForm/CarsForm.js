import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./CarsForm.css";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CAR, UPDATE_CAR } from "../../mutation/carsMutation";

const CarsForm = ({ refetch, selectedCar, setSelectedCar, emptyCar }) => {
  const [onCreateCar] = useMutation(ADD_CAR);
  const [onUpdateCar] = useMutation(UPDATE_CAR);

  const saveCar = useCallback(() => {
    if (selectedCar.id) {
      const { __typename, ...carM } = selectedCar;
      onUpdateCar({ variables: { id: selectedCar.id, car: carM } });
    } else {
      onCreateCar({ variables: { car: selectedCar } });
    }

    refetch();
    setSelectedCar(emptyCar);
  }, [
    selectedCar,
    refetch,
    setSelectedCar,
    emptyCar,
    onCreateCar,
    onUpdateCar
  ]);

  return (
    <div className="cars-form w-100">
      <div className="row">
        <div className="">Name: </div>
        <div className="">
          <input
            className="form-control w-100 form-control-lg"
            type="text"
            value={selectedCar.name}
            onChange={e =>
              setSelectedCar({ ...selectedCar, name: e.target.value })
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="">Color: </div>
        <div className="">
          <input
            className="form-control w-100 form-control-lg"
            type="text"
            value={selectedCar.color}
            onChange={e =>
              setSelectedCar({ ...selectedCar, color: e.target.value })
            }
          />
        </div>
      </div>
      <div className="row">
        <div className="cell-button">
          <button className="btn btn-primary mr-4 cell-button-save" type="submit" disabled={!selectedCar.name} onClick={() => saveCar()}>Save</button>
          <button className="btn btn-primary" type="submit" onClick={() => setSelectedCar(emptyCar)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

CarsForm.propTypes = {
  refetch: PropTypes.func.isRequired,
  selectedCar: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  emptyCar: PropTypes.shape({
    name: PropTypes.string,
    color: PropTypes.string
  }).isRequired,
  setSelectedCar: PropTypes.func.isRequired
};

export default CarsForm;
