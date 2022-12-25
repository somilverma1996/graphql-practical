import React, { useState, useMemo, useCallback } from "react";
import "./Cars.css";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";

import {
  GET_CARS,
  GET_SALES_DATA,
} from '../../queries/carsQueries'

import {
  REMOVE_CAR,
} from '../../mutation/carsMutation'

import {
  CAR_SALES_SUBSCRIPTION
} from '../../subscriptions/carsSubcriptions'

import CarsForm from "../CarsForm/CarsForm";

const Cars = () => {
  const emptyCar = useMemo(() => {
    return { name: "", color: "blue" };
  }, []);

  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(10000);

  const { data, loading, error, refetch } = useQuery(GET_CARS, {
    variables: { from, to }
  });

  const setLimit = useCallback((type, val) => {
    if (type === "from") setFrom(parseInt(val));
    if (type === "to") setTo(parseInt(val));
  }, []);

  // create delete handler
  const [onDeleteHandler] = useMutation(REMOVE_CAR);

  const deleteCar = useCallback(
    id => {
      onDeleteHandler({ variables: { id } });
      refetch();
      setSelectedCar(emptyCar);
    },
    [refetch, onDeleteHandler, emptyCar]
  );

  const [selectedCar, setSelectedCar] = useState(emptyCar);

  // Set up real-time subscription
  const { data: salesQData, salesLoading } = useQuery(GET_SALES_DATA, {});

  const { data: subData } = useSubscription(CAR_SALES_SUBSCRIPTION);

  const getSalesData = () => {
    if (subData && subData.carSold) {
      return subData.carSold.amount;
    } else if (salesQData && salesQData.getSalesData && !salesLoading) {
      return salesQData.getSalesData.amount;
    }
  };

  if (loading) return <p>Loading....</p>;

  if (error) {
    return (
      <div>
        <p>Error</p>
        <div>{error.message}</div>
      </div>
    );
  }

  return (
    <div className="cars">
      {((subData && subData.carSold) || (salesQData && !salesLoading)) && (
        <div className="cars-sold">Sales/Total: {getSalesData()} $</div>
      )}
      <CarsForm
        refetch={refetch}
        selectedCar={selectedCar}
        setSelectedCar={setSelectedCar}
        emptyCar={emptyCar}
      />
      <div className="cars-title">
        <div>Cars </div>
        <div className="label-limit"> Limit: </div>
        <input
          className="form-control w-100 form-control-lg"
          type="number"
          value={from}
          onClick={e => setLimit("from", e.target.value)}
          onChange={e => setLimit("from", e.target.value)}
        />{" "}
        - {" "}
        <input
          className="form-control w-100 form-control-lg"
          type="number"
          value={to}
          onClick={e => setLimit("to", e.target.value)}
          onChange={e => setLimit("to", e.target.value)}
        />
      </div>
      <table className="mt-5 table table-striped table-bordered table-light">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Car Name</th>
            <th scope="col">Color</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.getCars &&
            data.getCars.map((car, i) => {
              return (
                <tr key={i + 0}>

                  <th scope="row"
                    key={i + 0}
                    // className="list-row"
                    onClick={() => setSelectedCar(car)}
                  >
                    {i + 1}
                  </th>
                  <td>{car.name}</td>
                  <td className="color" style={{ background: car.color }}>
                  </td>
                  <td
                    onClick={e => {
                      e.stopPropagation();
                      deleteCar(car.id);
                    }}
                  >
                    X
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Cars;
