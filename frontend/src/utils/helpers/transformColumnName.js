export const transformColumnName = (value) => {
  const header = value.split("_").slice(1);
  let finalStr = "";
  for (const i in header) {
    if (finalStr.length === 0) {
      finalStr = finalStr + header[i].replace(/([A-Z])/g, " $1").trim();
    } else {
      finalStr = finalStr + "/ " + header[i].replace(/([A-Z])/g, " $1").trim();
    }
  }
  return finalStr;
};
