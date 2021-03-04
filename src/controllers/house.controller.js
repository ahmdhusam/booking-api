import { HouseModel } from "../models/house.model";
import { UserModel } from "../models/user.model";

export class HouseController {
  static async index(req, res) {
    const { status } = req.query;
    const houses = await HouseModel.find({ status });

    return res.json({ houses });
  }

  static async store(req, res) {
    const { filename } = req.file;
    const { description, price, location, status } = req.body;
    const { userId } = req.headers;

    const house = await HouseModel.create({
      user: userId,
      thumbnail: filename,
      description,
      price,
      location,
      status,
    });

    return res.json({ house });
  }

  static async update(req, res) {
    const { filename } = req.file;
    const { houseId } = req.params;
    const { description, price, location, status } = req.body;
    const { userId } = req.headers;

    const user = await UserModel.findById(userId);
    const house = await HouseModel.findById(houseId);

    if (user._id.toString() !== houses.user.toString()) {
      return res.status(403).json({ error: "Forbidden Request" });
    }

    await HouseModel.updateOne(
      { _id: houseId },
      {
        user: userId,
        thumbnail: filename,
        description,
        price,
        location,
        status,
      }
    );
    return res.json({ house });
  }

  static async destroy(req, res) {
    const { houseId } = req.body;

    await HouseModel.findByIdAndDelete({ _id: houseId });

    return res.status(200).json({ message: "Successfully deleted!" });
  }
}
