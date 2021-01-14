export const addToObject = (
  obj: any,
  key: string | number,
  value: any,
  index?: number
) => {
  // Create a temp object and index variable
  let temp: any = {};
  let i = 0;

  // Loop through the original object
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      // If the indexes match, add the new item
      if (i === index && key && value) {
        temp[key] = value;
      }

      // Add the current item in the loop to the temp obj
      temp[prop] = obj[prop];

      // Increase the count
      i++;
    }
  }

  // If no index, add to the end
  if (!index && key) {
    temp[key] = value;
  }

  return temp;
};
