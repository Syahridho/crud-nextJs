import { NextApiRequest, NextApiResponse } from "next";
import { add, retrieveData, updateData } from "@/lib/firebase/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const data = await retrieveData("crud");
    res
      .status(200)
      .json({ status: true, statusCode: 200, message: "success", data });
  } else if (req.method === "POST") {
    let data = req.body;
    await add("crud", data, (status: boolean, result: any) => {
      if (status) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
          data: { id: result.id },
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "failed",
          data: {},
        });
      }
    });
  } else if (req.method === "PUT") {
    const { crud }: any = req.query;
    const { data } = req.body;

    await updateData("crud", crud[0], data, (status: boolean) => {
      if (status) {
        res.status(200).json({
          status: true,
          statusCode: 200,
          message: "success",
        });
      } else {
        res.status(400).json({
          status: false,
          statusCode: 400,
          message: "failed",
        });
      }
    });
  }
}
