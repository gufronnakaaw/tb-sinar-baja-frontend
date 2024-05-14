export type InvoicesInType = {
  id: string;
  reference: string;
  from: string;
  total: number;
  due_date: string;
  description: string;
};

export type InvoicesOutType = {
  id: string;
  date: string;
  total: number;
  to: string;
};
