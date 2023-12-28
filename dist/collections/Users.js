"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            // from resend.com >docs >serverless>stmp>nodemailer
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href= ".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, ">Verify Account</a>");
            },
        },
    },
    access: {
        read: function () { return true; },
        create: function () { return true; },
    },
    fields: [
        {
            name: "products",
            label: "Products",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "products",
            hasMany: true,
        },
        {
            name: "product_files",
            label: "Product files",
            admin: {
                condition: function () { return false; },
            },
            type: "relationship",
            relationTo: "product_files",
            hasMany: true,
        },
        {
            name: "role",
            required: true,
            defaultValue: "user",
            // admin: {
            //   condition: () => false,
            // },
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
        },
    ],
};
