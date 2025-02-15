/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCareerApplication = /* GraphQL */ `
  query GetCareerApplication($id: ID!) {
    getCareerApplication(id: $id) {
      id
      name
      email
      resumeUrl
      appliedAt
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listCareerApplications = /* GraphQL */ `
  query ListCareerApplications(
    $filter: ModelCareerApplicationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCareerApplications(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        resumeUrl
        appliedAt
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
