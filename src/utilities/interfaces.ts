export type MomentStringYYYY_MM_DD = string; // 2020-01-01
export type MomentDayOfMonth = number; // 13
export type MomentDayOfWeek = number; // 02 (Monday)
export type EventType = "income" | "bill" | "purchase" | "creditcard";
export enum FrequencyType {
  "onetime", // once
  "daily", // every day
  "weekly", // every week
  "monthly", // every month
  "biweekly", // every 2 weeks
  "semiannually", // every 6 months
  "quarterly", // every quarter
  "anually", // every year
  "semimonthly", // twice a month
}

export interface PlaidItemResponseInterface {
  item: {
    available_products: string[];
    billed_products: string[];
    consent_expiration_time: any;
    error: any;
    institution_id: string;
    item_id: string;
    webhook: string;
  };
  request_id: string;
  status: {
    last_webhook: {
      code_sent: string;
      sent_at: string;
    };
    transactions: {
      last_failed_update: any;
      last_successful_update: string;
    };
  };
}

export interface PlaidTransactionInterface {
  account_id: string;
  account_owner: any;
  amount: number;
  authorized_date: any;
  category: string[];
  category_id: string;
  date: string;
  iso_currency_code: string;
  location: {
    address: any;
    city: any;
    country: any;
    lat: any;
    lon: any;
    postal_code: any;
    region: any;
    store_number: any;
  };
  merchant_name: string;
  name: string;
  payment_channel: string;
  payment_meta: {
    by_order_of: any;
    payee: any;
    payer: any;
    payment_method: any;
    payment_processor: any;
    ppd_id: any;
    reason: any;
    reference_number: any;
  };
  pending: boolean;
  pending_transaction_id: any;
  transaction_code: any;
  transaction_id: string;
  transaction_type: string;
  unofficial_currency_code: any;
}

export interface MoneyEvent {
  amount: number | string;
  date: MomentStringYYYY_MM_DD;
  type: EventType;
  name: string;
}

export interface BaseStream {
  name: string;
  amount: number | string;
  type: EventType;
  frequency: FrequencyType;
  _id?: string;
  userid: string;
  savingsContribution?: Number;
}

export interface OneTimeStream extends BaseStream {
  frequency: FrequencyType.onetime;
  futureDate: MomentStringYYYY_MM_DD;
  type: "income" | "purchase";
}

export interface DailyStream extends BaseStream {
  frequency: FrequencyType.daily;
  type: "income" | "bill";
}

export interface WeeklyMonthlyStream extends BaseStream {
  frequency: FrequencyType.weekly | FrequencyType.monthly;
  day: MomentDayOfMonth | MomentDayOfWeek;
  type: "income" | "bill";
}

export interface CreditCardStream extends BaseStream {
  futureDate: MomentStringYYYY_MM_DD;
  frequency: FrequencyType.onetime;
  creditCardGoal: number | string;
  transactions: PlaidTransactionInterface[];
  itemId: string;
  type: "creditcard";
  primary: boolean;
}

export interface BiweeklyQuarterlySemiannuallyAnnuallyStream extends BaseStream {
  frequency:
    | FrequencyType.biweekly
    | FrequencyType.quarterly
    | FrequencyType.semiannually
    | FrequencyType.anually;
  nextDate: MomentStringYYYY_MM_DD;
  type: "income" | "bill";
}

export interface SemimonthlyStream extends BaseStream {
  frequency: FrequencyType.semimonthly;
  mostRecentDate: MomentStringYYYY_MM_DD;
  secondMostRecentDate: MomentStringYYYY_MM_DD;
  type: "income" | "bill";
}

export type MoneyStream =
  | OneTimeStream
  | DailyStream
  | WeeklyMonthlyStream
  | CreditCardStream
  | BiweeklyQuarterlySemiannuallyAnnuallyStream
  | SemimonthlyStream;

export interface CategoryData {
  category: string;
  type: "fun" | "important" | "base";
}

export interface CategorizedTransactionData {
  transactionId: string;
  type: "fun" | "important" | "base";
}

export interface CurrentBalanceDatum {
  amount: number;
  date: string;
}

export interface UserData {
  balances: CurrentBalanceDatum[];
  hasCreditCardAccess: boolean;
  hasAcceptedCreditCardAccess: boolean;
  categories: { category: string; type: "important" | "fun" | "base" }[];
}

export interface Liability {
  dueDate: string;
  statementBalance: number;
  accountName: string;
  transactions: PlaidTransactionInterface[];
  mask: string;
  balance: number;
  lastUpdatedAt: string;
  lastStatementIssueDate: string;
}

export interface LiabilityItem {
  name: string;
  logo: string;
  primary_color: string;
  liabilities: Liability[];
  item: PlaidItemResponseInterface;
}

export interface RunningBalanceMapInterface {
  [index: string]: number;
}
