export const enumValues = <TEnum extends { [name: string]: any }>(
  value: TEnum,
  nullable = false
) => {
  const output = Object.values(value).filter(
    (value) => typeof value !== "string"
  );

  if (nullable) {
    output.push(null);
  }

  return output as number[];
};
