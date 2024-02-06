import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(403, "Forbidden - not your event"));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Event deleted");
  } catch (error) {}

  next(error);
};
