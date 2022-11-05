import { gql } from "@apollo/client";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { nhost } from "../../_app";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
        "616132242970-jigdv5a3qk3u2caef6lq0198sq50i17d.apps.googleusercontent.com",
      clientSecret:
        process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET ||
        "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",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      return `${baseUrl}/app`;
    },
    async signIn({ user, account, profile }) {
      console.log(user);
      const CREATE_USER = gql`
        mutation {
          insert_user_details_one(
            object: { email: "${user.email}", image: "${user.image}", name: "${user.name}" }
          ){
            email
            id
            name
          }
        }
      `;

      const data = await nhost.graphql.request(CREATE_USER);

      console.log(data);

      return true;
    },
  },
};

export default NextAuth(authOptions);
