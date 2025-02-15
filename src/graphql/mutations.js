/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCareerApplication = /* GraphQL */ `
  mutation CreateCareerApplication(
    $input: CreateCareerApplicationInput!
    $condition: ModelCareerApplicationConditionInput
  ) {
    createCareerApplication(input: $input, condition: $condition) {
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
export const updateCareerApplication = /* GraphQL */ `
  mutation UpdateCareerApplication(
    $input: UpdateCareerApplicationInput!
    $condition: ModelCareerApplicationConditionInput
  ) {
    updateCareerApplication(input: $input, condition: $condition) {
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
export const deleteCareerApplication = /* GraphQL */ `
  mutation DeleteCareerApplication(
    $input: DeleteCareerApplicationInput!
    $condition: ModelCareerApplicationConditionInput
  ) {
    deleteCareerApplication(input: $input, condition: $condition) {
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
