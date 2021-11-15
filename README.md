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

Or, if you are using ESM:

```javascript
import {LunchMoney} from 'lunch-money'
const lunchMoney = new LunchMoney( { token: 'my-api-token' } );
const assets = await lunchMoney.getAssets();
```

## API

Get all assets (manually managed accounts):

```typescript
LunchMoney.getAssets() : Promise<Asset>
```

Get all transactions:

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

## Examples

There are many open source projects with example code you can use to quickly build your integration:

https://lunchmoney.dev/#awesome-projects