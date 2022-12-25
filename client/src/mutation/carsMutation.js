import gql from "graphql-tag";

const REMOVE_CAR = gql`
  mutation RemoveCar($id: Int!) {
    removeCar(id: $id) {
      name
    }
  }
`;

const ADD_CAR = gql`
  mutation CreateCar($car: CarInput) {
    createCar(car: $car) {
      id
      name
      color
    }
  }
`;

const UPDATE_CAR = gql`
  mutation UpdateCar($id: Int!, $car: CarInput) {
    updateCar(id: $id, car: $car) {
      id
      name
      color
    }
  }
`;

export {
  UPDATE_CAR,
  ADD_CAR,
  REMOVE_CAR
}