export enum AccountType {
  INDIVIDUAL = "INDIVIDUAL",
  CORPORATE = "CORPORATE",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export enum UserRoles {
  CUSTOMER = "CUSTOMER",
  BANKER = "BANKER",
  ADMIN = "ADMIN",
}

export type RedisOptions = {
  key: string;
  value: string;
  timeType: string;
  time: number;
};

export type RefreshPayload = {
  email: string;
  id: string;
  refresh: string;
};

export type JwtDecodedOptions = {
  type: string; 
  aud: string; 
  iss: string 
};
export type Tokens = {
  access: string, 
  refresh: string 
}