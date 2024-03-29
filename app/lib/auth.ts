import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDb } from "../config/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/app/models/userModel";
import { NextAuthOptions, Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          await connectDb();
          const user = await User.findOne({ email: email });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcryptjs.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,

  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account.provider === "google") {
        try {
          const { name, email, _id } = user;
          await connectDb();
          const ifUser = await User.findOne({ email: email });
          if (ifUser) {
            console.log("ifUser", ifUser);
            return ifUser;
          }
          const newUser = new User({
            name: name,
            email: email,
          });
          const response = await newUser.save();
          // console.log(newUser);
          if (response) {
            console.log("response is", response);
            return newUser;
          }
        } catch (error) {
          console.log(error);
        }
      }
      return user;
    },
    async jwt({ token, user }) {
      if (user) {
        (token.email = user.email), (token.name = user.name);
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: any }) {
      if (session.user) {
        session = {
          ...session,
          user: {
            email: token.email,
            name: token.name,
            ...session.user,
          },
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/signup",
  },
};

export default NextAuth(authOptions);
