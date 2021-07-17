export interface Asset {
    id: number;
    type_name: string;
    subtype_name?: string;
    name: string;
    balance: number;
    institution_name?: string;
}
export interface PlaidAccount {
    id: number;
    date_linked: string;
    name: string;
    type: "credit" | "depository" | "brokerage" | "cash" | "loan" | "Investment";
    subtype?: string;
    mask: string;
    institution_name: string;
    status: "active" | "inactive" | "relink" | "syncing" | "error" | "not found" | "not supported";
    last_import: string;
    balance: number;
    currency: string;
    balance_last_update: string;
    limit?: number;
}
export interface Transaction {
    id: number;
    date: string;
    payee: string;
    amount: string;
    currency: string;
    notes: string;
    category_id?: number;
    asset_id?: number;
    plaid_account_id?: number;
    status: "cleared" | "uncleared" | "recurring" | "recurring_suggested";
    parent_id?: number;
    is_group: boolean;
    group_id?: number;
    tags?: Tag;
    external_id?: string;
}
export interface DraftTransaction {
    date: string;
    category_id?: number;
    payee: string;
    amount: string;
    currency: string;
    notes: string;
    asset_id?: number;
    recurring_id?: number;
    status: "cleared" | "uncleared";
    external_id?: string;
}
export interface Tag {
    id: number;
    name: string;
}
export interface TransactionsEndpointArguments {
    start_date?: string;
    end_date?: string;
    debit_as_negative?: boolean;
}
interface EndpointArguments {
    [s: string]: any;
}
export default class LunchMoney {
    token: string;
    constructor(args: {
        token: string;
    });
    get(endpoint: string, args?: EndpointArguments): Promise<any>;
    post(endpoint: string, args?: EndpointArguments): Promise<any>;
    request(method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, args?: EndpointArguments): Promise<any>;
    getAssets(): Promise<Asset[]>;
    getPlaidAccounts(): Promise<PlaidAccount[]>;
    getTransactions(args?: TransactionsEndpointArguments): Promise<Transaction[]>;
    createTransactions(transactions: DraftTransaction[], applyRules?: boolean, checkForRecurring?: boolean, debitAsNegative?: boolean): Promise<any>;
}
export {};
