import { ReserveModel } from "../models/reserve.model";
import { UserModel } from "../models/user.model";
import { HouseModel } from "../models/house.model";

export class ReserveController {
  static async index(req, res) {
    const { userId } = req.headers;

    const reserves = await ReserveModel.find({ user: userId }).populate(
      "house"
    );

    return res.json({ reserves });
  }

  static async store(req, res) {
    const { userId } = req.headers;
    const { houseId } = req.params;
    const { date } = req.body;

    const house = await HouseModel.findById(houseId);
    if (!house) {
      return res.status(404).json({ error: "House Not Found" });
    }

    if (house.status !== true) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const user = await UserModel.findById(userId);
    if (user._id.toString() === house.user.toString()) {
      return res.status(403).json({ error: "Forbidden Request" });
    }

    const reserve = await ReserveModel.create({
      user: userId,
      house: houseId,
      date,
    });

    await reserve.populate(["user", "house"]);

    return res.json({ reserve });
  }

  static async destroy(req, res) {
    const { reserveId } = req.body;

    await ReserveModel.findByIdAndDelete({ _id: reserveId });

    return res.status(200).json({ message: "Successfully deleted!" });
  }
}
