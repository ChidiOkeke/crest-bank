export enum AccountType {
  INDIVIDUAL = "INDIVIDUAL",
  CORPORATE = "CORPORATE",
}

export enum AccountStatus {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  CLOSED = "CLOSED"
}

export enum UserRoles {
  CUSTOMER = "CUSTOMER",
  BANKER = "BANKER",
  ADMIN = "ADMIN",
}

export enum AuthorizationActions {
  CREATE = "CREATE",
  SUSPEND = "SUPEND",
  REINSTATE = "REINSTATE",
  VIEW = "VIEW",
  INITIATE = "INITIATE"
}

export enum AuthorizationPermissions {
  ACCOUNT = "ACCOUNT",
  BALANCE = "ACCOUNT",
  HISTORY = "HISTORY",
  TRANSFER = "TRANSFER"
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

export type Permissions = {
  role: string,
  action: string,
  subject: string
} 
export type TransactionHistoryQuery = {
  user?: string,
  userAccountNumber:string,
  beneficiaryAccountNumber:string,
} 