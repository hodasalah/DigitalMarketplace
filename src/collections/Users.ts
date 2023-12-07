import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      // from resend.com >docs >serverless>stmp>nodemailer
      generateEmailHTML: ({ token }) => {
        console.log(token)
        return `<h3>Hello Please verify Your Email Address</h3>
        <button>verify your email</button>`
      }
    }
  },
  access: {
    read: () => true,
    create: () => true,

  },
  fields: [
    {
      name: "role",
      required: true,
      defaultValue: "user",
      // admin: {
      //   condition: () => false,
      // },
      type: 'select',
      options: [
        { label: "Admin", value: "admin" },
        { label: "User", value: "user" }
      ]
    }
  ],

}