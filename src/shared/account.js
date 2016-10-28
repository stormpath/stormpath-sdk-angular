"use strict";
var Account = (function () {
    function Account(account) {
        for (var property in account) {
            this[property] = account[property];
        }
    }
    return Account;
}());
exports.Account = Account;
//# sourceMappingURL=account.js.map