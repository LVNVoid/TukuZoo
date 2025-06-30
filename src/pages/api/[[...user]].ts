import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const users = await retrieveData("users");
    const data = users.map((user: any) => {
      delete user.password;
      return user;
    });
    return res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Users fetched successfully",
      data,
    });
  } else if (req.method === "PUT") {
    const { user }: any = req.query;
    const id = user[1];
    const data = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (err || !decoded) {
          return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized",
          });
        }

        if (decoded.role !== "admin") {
          return res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Forbidden: Only admin can update users",
          });
        }

        await updateData("users", id, data, (result: boolean) => {
          if (result) {
            return res.status(200).json({
              status: true,
              statusCode: 200,
              message: "User updated successfully",
            });
          } else {
            return res.status(500).json({
              status: false,
              statusCode: 500,
              message: "Failed to update user",
            });
          }
        });
      }
    );
  } else if (req.method === "DELETE") {
    const { user }: any = req.query;
    const token = req.headers.authorization?.split(" ")[1] || "";

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        if (err || !decoded) {
          return res.status(401).json({
            status: false,
            statusCode: 401,
            message: "Unauthorized",
          });
        }

        if (decoded.role !== "admin") {
          return res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Forbidden: Only admin can delete users",
          });
        }

        await deleteData("users", user[1], (result: boolean) => {
          if (result) {
            return res.status(200).json({
              status: true,
              statusCode: 200,
              message: "User deleted successfully",
            });
          } else {
            return res.status(404).json({
              status: false,
              statusCode: 404,
              message: "User not found or failed to delete",
            });
          }
        });
      }
    );
  } else {
    return res.status(405).json({
      status: false,
      statusCode: 405,
      message: `Method ${req.method} not allowed`,
    });
  }
}
