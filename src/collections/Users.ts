import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    verify: {
      // from resend.com >docs >serverless>stmp>nodemailer
      generateEmailHTML: ({ token }) => {
        return `<a href= ${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}>Verify Account</a>`
      }
    }
  },
  access: {
    read: () => true,
    create: () => true,

  },
  fields: [
    {
      name: 'products',
      label: 'Products',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'product_files',
      label: 'Product files',
      admin: {
        condition: () => false,
      },
      type: 'relationship',
      relationTo: 'product_files',
      hasMany: true,
    },
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