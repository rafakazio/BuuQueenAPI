import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js"

export const createHotel = async (req, res, next) => {
    const newHotel = new Hotel (req.body)//req what we are taking from user, its gonna store our hotel info
    
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel)
    } catch (err) {
        next(err)
    }
};

export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id, 
            { $set : req.body },
            { new: true }//findbyidandupdate method is gonna return the previous document not the updated one to prevent this - new : true 
        ); 
        res.status(200).json(updatedHotel)
    } catch (err) {
        next(err)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(
            req.params.id
        ); 
        res.status(200).json("Hotel has been deleted :/")
    } catch (err) {
        next(err)
    }
}

export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(
            req.params.id
        ); 
        res.status(200).json(hotel)
    } catch (err) {
        next(err)
    }
}

export const getHotels = async (req, res, next) => {
    const {min,max, ...others} = req.query
    try {
        const hotels = await Hotel.find({...others, cheapestPrice: { $gt:min || 1, $lt:max || 999}}).limit(req.query.limit); //$gt greater than $lt lower than 
        res.status(200).json(hotels)
    } catch (err) {
        next(err)
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(",");
    try {
      const list = await Promise.all(
        cities.map((city) => {
          return Hotel.countDocuments({ city: city });
        })
      );
      res.status(200).json(list);
    } catch (err) {
      next(err);
    }
};

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
      const resortCount = await Hotel.countDocuments({ type: "Resorts" });
      const villaCount = await Hotel.countDocuments({ type: "Villas" });
      const cabinCount = await Hotel.countDocuments({ type: "Cabins" });
  
      res.status(200).json([
        { type: "Hotel", count: hotelCount },
        { type: "Apartment", count: apartmentCount },
        { type: "Resorts", count: resortCount },
        { type: "Villas", count: villaCount },
        { type: "Cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };

  export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };