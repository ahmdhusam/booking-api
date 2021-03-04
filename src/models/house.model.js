import { Schema, model } from "mongoose";

const HouseSchema = new Schema(
  {
    thumbnail: String,
    description: String,
    price: String,
    location: String,
    status: Boolean,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

HouseSchema.virtual("thumbnail_url").get(function () {
  return `/files/${this.thumbnail}`;
});
export const HouseModel = model("House", HouseSchema);
