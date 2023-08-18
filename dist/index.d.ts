export declare type AssetTypeName = "employee compensation" | "cash" | "vehicle" | "loan" | "cryptocurrency" | "investment" | "other" | "credit" | "real estate";
export interface Asset {
    id: number;
    type_name: AssetTypeName;
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
export interface AssetUpdate {
    id: number;
    type_name?: AssetTypeName;
    subtype_name?: string | null;
    name?: string;
    display_name?: string | null;
    balance?: string;
    balance_as_of?: string;
    currency?: string;
    institution_name?: string | null;
}
export declare type PlaidAccountType = "credit" | "depository" | "brokerage" | "cash" | "loan" | "investment";
export declare type PlaidAccountStatus = "active" | "inactive" | "relink" | "syncing" | "error" | "not found" | "not supported";
export interface PlaidAccount {
    id: number;
    date_linked: string;
    name: string;
    type: PlaidAccountType;
    subtype?: string | null;
    mask: string;
    institution_name: string;
    status: PlaidAccountStatus;
    last_import?: string | null;
    balance: string;
    currency: string;
    balance_last_update: string;
    limit?: number | null;
}
export declare enum TransactionStatus {
    CLEARED = "cleared",
    UNCLEARED = "uncleared",
    RECURRING = "recurring",
    RECURRING_SUGGESTED = "recurring_suggested"
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
    status: TransactionStatus;
    parent_id?: number;
    is_group: boolean;
    group_id?: number;
    tags?: Tag;
    external_id?: string;
}
export interface TransactionUpdate {
    date: string;
    category_id: number;
    payee: string;
    amount?: number | string;
    currency: string;
    asset_id: number;
    recurring_id: number;
    notes: string;
    status: TransactionStatus.CLEARED | TransactionStatus.UNCLEARED;
    external_id: string;
    tags: (number | string)[];
}
export interface Split {
    payee?: string;
    date?: string;
    category_id?: number;
    notes?: string;
    amount: string | number;
}
export interface TransactionUpdateResponse {
    updated: boolean;
    split?: Split;
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
    status: TransactionStatus.CLEARED | TransactionStatus.UNCLEARED;
    external_id?: string;
}
export interface Tag {
    id: number;
    name: string;
}
export interface TransactionsEndpointArguments {
    start_date?: string;
    end_date?: string;
    tag_id?: number;
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
    put(endpoint: string, args?: EndpointArguments): Promise<any>;
    delete(endpoint: string, args?: EndpointArguments): Promise<any>;
    request(method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, args?: EndpointArguments): Promise<any>;
    getAssets(): Promise<Asset[]>;
    updateAsset(endpointArgs: AssetUpdate): Promise<any>;
    getPlaidAccounts(): Promise<PlaidAccount[]>;
    getTransactions(args?: TransactionsEndpointArguments): Promise<Transaction[]>;
    getTransaction(id: number, args?: EndpointArguments): Promise<Transaction>;
    updateTransaction(id: number, transaction: TransactionUpdate): Promise<TransactionUpdateResponse>;
    getCategories(): Promise<Category[]>;
    createCategory(name: string, description: string, isIncome: boolean, excludeFromBudget: boolean, excludeFromTotals: boolean): Promise<any>;
    createTransactions(transactions: DraftTransaction[], applyRules?: boolean, checkForRecurring?: boolean, debitAsNegative?: boolean, skipBalanceUpdate?: boolean): Promise<any>;
}
export default LunchMoney;
