import gql from "graphql-tag";

const CAR_SALES_SUBSCRIPTION = gql`
  subscription OnCarSold {
    carSold {
      amount
    }
  }
`;

export {
    CAR_SALES_SUBSCRIPTION
}