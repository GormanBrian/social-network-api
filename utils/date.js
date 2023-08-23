import { format } from "date-fns";

export const formatDate = (val) =>
  format(new Date(val), "MMM do',' yyyy 'at' hh':'mm aaa");
