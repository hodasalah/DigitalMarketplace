"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
var auth_router_1 = require("./auth-router");
var products_router_1 = require("./products-router");
var trpc_1 = require("./trpc");
var payment_router_1 = require("./payment-router");
exports.appRouter = (0, trpc_1.router)({
    //here we define our routes[endpoint]
    auth: auth_router_1.authRouter,
    getInfiniteProducts: products_router_1.productsRouter,
    payment: payment_router_1.paymentRouter
});
