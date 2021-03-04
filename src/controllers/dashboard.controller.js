import { HouseModel } from "../models/house.model";

export class DashboardController {
  static async show(req, res) {
    const { userId } = req.headers;

    const houses = await HouseModel.find({ user: userId });

    return res.json({ houses });
  }
}
