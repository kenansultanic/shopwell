const userSchema = [
    { field: '_id', headerName: 'ID', hide: true },
    { field: 'firstName', headerName: 'Name', width: 150 },
    { field: 'lastName', headerName: 'Surname', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
];

const productSchema = [
    { field: 'code', headerName: 'Code', width: 150 },
    { field: '_id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
];

const productReviewSchema = [
    { field: '_id', headerName: 'ID', hide: true },
    { field: 'rating', headerName: 'Rating', width: 150 },
    { field: 'comment', headerName: 'Comment', width: 150 },
];

const restrictionSchema = [
    { field: '_id', headerName: 'ID', hide: true },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
];

const restrictionSuggestionSchema = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'description', headerName: 'Description', width: 200 },
];

export const getListResourceSchema = resource => {
  switch (resource) {
      case 'users':
          return userSchema;
      case 'products':
          return productSchema;
      case 'restrictions':
          return restrictionSchema;
      case 'product-reviews':
          return productReviewSchema;
      case 'restriction-suggestions':
          return restrictionSuggestionSchema;
      default:
        return restrictionSchema;
  }
};