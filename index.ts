import fetch from 'isomorphic-fetch';

const base = 'https://dev.lunchmoney.app';

export interface Asset {
	id: number;
	type_name: "employee compensation"
	  | "cash"
	  | "vehicle"
	  | "loan"
	  | "cryptocurrency"
	  | "investment"
	  | "other"
	  | "credit"
	  | "real estate";
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
	status:
	  | "active"
	  | "inactive"
	  | "relink"
	  | "syncing"
	  | "error"
	  | "not found"
	  | "not supported";
	last_import?: string | null;
	balance: string;
	currency: string;
	balance_last_update: string;
	limit?: number | null;
}

export interface Transaction {
	id: number,
	date: string,
	payee: string,
	amount: string,
	currency: string,
	notes: string,
	category_id?: number,
	asset_id?: number,
	plaid_account_id?: number,
	status: "cleared" | "uncleared" | "recurring" | "recurring_suggested",
	parent_id?: number,
	is_group: boolean,
	group_id?: number,
	tags?: Tag,
	external_id?: string,
}

export interface DraftTransaction {
	date: string,
	category_id?: number,
	payee: string,
	amount: string,
	currency: string,
	notes: string,
	asset_id?: number,
	recurring_id?: number,
	status: "cleared" | "uncleared",
	external_id?: string,
}

export interface Tag {
	id: number,
	name: string,
}

export interface TransactionsEndpointArguments {
	start_date?: string,
	end_date?: string,
	debit_as_negative?: boolean,
}

interface EndpointArguments {
	[s: string]: any,
}

export default class LunchMoney {
	token: string;
	constructor( args: { token: string } ) {
		this.token = args.token;
	}

	async get( endpoint: string, args?: EndpointArguments ) {
		return this.request( 'GET', endpoint, args );
	}

	async post( endpoint: string, args?: EndpointArguments ) {
		return this.request( 'POST', endpoint, args );
	}

	async request( method: "GET" | "POST" | "PUT" | "DELETE", endpoint: string, args?: EndpointArguments ) {

		let url = `${ base }${ endpoint }`;
		if ( method === 'GET' && args ) {
			url += '?';
			url += Object.entries( args )
				.map( ( [ key, value ] ) => `${ key }=${ value }` )
				.join( '&' );
		}
		const headers = new Headers();
		headers.set( 'Accept', '*/*' );
		headers.set( 'Authorization', `Bearer ${ this.token }` );
		const options: RequestInit = {
			headers,
			method,
		};

		if ( ( method === 'POST' || method === 'PUT' ) && args ) {
			options.body = JSON.stringify( args );
			headers.set( 'Content-Type', 'application/json' );
		}
		const response = await fetch( url, options );
		if ( response.status > 399 ) {
			const r = await response.text();
			throw new Error( r );
		} else {
			return response.json();
		}
	}

	async getAssets() : Promise<Asset[]> {
		return this.get( '/v1/assets' );
	}

	async getPlaidAccounts() : Promise<PlaidAccount[]> {
		return ( await this.get( '/v1/plaid_accounts' ) ).plaid_accounts;
	}

	async getTransactions( args?: TransactionsEndpointArguments ) : Promise<Transaction[]> {
		return ( await this.get( '/v1/transactions', args ) ).transactions;
	}

	async createTransactions( transactions: DraftTransaction[], applyRules = false, checkForRecurring = false, debitAsNegative = false ) : Promise<any> {
		const response = await this.post( '/v1/transactions', {
			transactions: transactions,
			apply_rules: applyRules,
			check_for_recurring: checkForRecurring,
			debit_as_negative: debitAsNegative
		} );

		return response;
	}
}
