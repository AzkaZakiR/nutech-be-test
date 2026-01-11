export interface registerInput {
   email: string;
   password: string;
   first_name: string;
   last_name: string;
}

export interface loginInput {
   email: string;
   name?: string;
}

export interface UserPayload {
   id: string;
   email: string;
   first_name?: string;
   last_name?: string;
}
