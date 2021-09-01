# Lunch Money JS

## Installing

```
npm install lunch-money
```


The NPM module also makes types available to TypeScript.

## Usage

```js
import LunchMoney, { Asset } from 'lunch-money';

const lunchMoney = new LunchMoney( { token: 'my-api-token' } );

lunchMoney.getAssets().then( ( assets: Asset[] ) => {
	console.log( assets )
} ).catch ( error => {
	console.error( error );
} );
```

## API

Get all assets

```typescript
LunchMoney.getAssets() : Promise<Asset>
```

Get all transactions

```typescript
LunchMoney.getTransactions( arguments?: TransactionsEndpointArguments ) : Promise<Transaction[]>
```

Create transactions

```typescript
LunchMoney.createTransactions(
	transactions: DraftTransaction[],
	applyRules = false,
	checkForRecurring = false,
	debitAsNegative = false
) : Promise<any>
```
