"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var product_guard_service_1 = require("./product-guard.service");
describe('ProductGuardService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [product_guard_service_1.ProductGuardService]
        });
    });
    it('should be created', testing_1.inject([product_guard_service_1.ProductGuardService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=product-guard.service.spec.js.map