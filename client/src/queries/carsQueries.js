import gql from "graphql-tag";

const GET_CARS = gql`
  query Cars($from: Int, $to: Int) {
    getCars(from: $from, to: $to) {
      id
      name
      color
    }
  }
`;

const GET_SALES_DATA = gql`
  query SalesData {
    getSalesData {
      amount
    }
  }
`;

export {
    GET_CARS,
    GET_SALES_DATA
}