export type ZodError = {
  name: string;
  message: string;
  errors: {
    field: [string, number, string];
    message: string;
  }[];
};
