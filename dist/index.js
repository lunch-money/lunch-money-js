"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunchMoney = exports.TransactionStatus = void 0;
const isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
const base = 'https://dev.lunchmoney.app';
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus["CLEARED"] = "cleared";
    TransactionStatus["UNCLEARED"] = "uncleared";
    TransactionStatus["RECURRING"] = "recurring";
    TransactionStatus["RECURRING_SUGGESTED"] = "recurring_suggested";
})(TransactionStatus = exports.TransactionStatus || (exports.TransactionStatus = {}));
class LunchMoney {
    constructor(args) {
        this.token = args.token;
    }
    get(endpoint, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', endpoint, args);
        });
    }
    post(endpoint, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', endpoint, args);
        });
    }
    put(endpoint, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', endpoint, args);
        });
    }
    delete(endpoint, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', endpoint, args);
        });
    }
    request(method, endpoint, args) {
        return __awaiter(this, void 0, void 0, function* () {
            let url = `${base}${endpoint}`;
            if (method === 'GET' && args) {
                url += '?';
                url += Object.entries(args)
                    .map(([key, value]) => `${key}=${value}`)
                    .join('&');
            }
            const headers = new Headers();
            headers.set('Accept', '*/*');
            headers.set('Authorization', `Bearer ${this.token}`);
            const options = {
                headers,
                method,
            };
            if ((method === 'POST' || method === 'PUT') && args) {
                options.body = JSON.stringify(args);
                headers.set('Content-Type', 'application/json');
            }
            const response = yield (0, isomorphic_fetch_1.default)(url, options);
            if (response.status > 399) {
                const r = yield response.text();
                throw new Error(r);
            }
            else {
                return response.json();
            }
        });
    }
    getAssets() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get('/v1/assets')).assets;
        });
    }
    updateAsset(endpointArgs) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.put('/v1/assets/' + endpointArgs.id, endpointArgs));
        });
    }
    getPlaidAccounts() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get('/v1/plaid_accounts')).plaid_accounts;
        });
    }
    getTransactions(args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get('/v1/transactions', args)).transactions;
        });
    }
    getTransaction(id, args) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get('/v1/transactions/' + id, args));
        });
    }
    updateTransaction(id, transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.put('/v1/transactions/' + id, { transaction: transaction }));
        });
    }
    getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.get('/v1/categories')).categories;
        });
    }
    createCategory(name, description, isIncome, excludeFromBudget, excludeFromTotals) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.post('/v1/categories', {
                name,
                description,
                is_income: isIncome,
                exclude_from_budget: excludeFromBudget,
                exclude_from_totals: excludeFromTotals
            });
            return response;
        });
    }
    createTransactions(transactions, applyRules = false, checkForRecurring = false, debitAsNegative = false, skipBalanceUpdate = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.post('/v1/transactions', {
                transactions: transactions,
                apply_rules: applyRules,
                check_for_recurring: checkForRecurring,
                debit_as_negative: debitAsNegative,
                skip_balance_update: skipBalanceUpdate,
            });
        });
    }
}
exports.LunchMoney = LunchMoney;
exports.default = LunchMoney;
