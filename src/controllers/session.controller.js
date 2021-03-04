import { UserModel } from "../models/user.model";

export class SessionController {
  static async store(req, res) {
    const { email } = req.body;

    let user = await UserModel.findOne({ email });
    if (!user) {
      user = await UserModel.create({ email });
    }

    return res.json({ user });
  }
}
