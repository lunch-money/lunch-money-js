export interface Asset {
    id: number;
    type_name: "employee compensation" | "cash" | "vehicle" | "loan" | "cryptocurrency" | "investment" | "other" | "credit" | "real estate";
    subtype_name?: string | null;
    name: string;
    display_name?: string | null;
    balance: string;
    balance_as_of: string;
    currency: string;
    closed_on?: string | null;
    institution_name?: string | null;
    created_at: string;
}
export interface PlaidAccount {
    id: number;
    date_linked: string;
    name: string;
    type: "credit" | "depository" | "brokerage" | "cash" | "loan" | "investment";
    subtype?: string | null;
    mask: string;
    institution_name: string;
    status: "active" | "inactive" | "relink" | "syncing" | "error" | "not found" | "not supported";
    last_import?: string | null;
    balance: string;
    currency: string;
    balance_last_update: string;
    limit?: number | null;
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
export interface Category {
    id: number;
    name: string;
    description: string;
    is_income: boolean;
    exclude_from_budget: boolean;
    exclude_from_totals: boolean;
    updated_at: string;
    created_at: string;
    is_group: boolean;
    group_id?: number;
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
export declare class LunchMoney {
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
    getCategories(): Promise<Category[]>;
    createTransactions(transactions: DraftTransaction[], applyRules?: boolean, checkForRecurring?: boolean, debitAsNegative?: boolean): Promise<any>;
}
export default LunchMoney;
