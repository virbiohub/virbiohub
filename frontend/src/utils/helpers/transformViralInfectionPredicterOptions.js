const transformOptions = (rawOptions) => {
  const finalOptions = [];
  for (const item in rawOptions) {
    const value = rawOptions[item];
    finalOptions.push({ label: value, value: value });
  }
  return finalOptions;
};

export default transformOptions;
