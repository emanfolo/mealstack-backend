declare namespace Express {
  export interface User {
    id: any;
  }
  export interface Request {
    user?: User;
  }
  export interface Response {
    user?: User;
  }
}
