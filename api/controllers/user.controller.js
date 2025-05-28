import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import cloudinary from "../config/cloudinary.js";

export const test = (req, res) => {
  res.json({ message: "Api is working" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "you are not allowed to update user"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "password must be at least 6 characters"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
            errorHandler(400, "username must be between 7 and 20 characters")
        );
        }
        if (req.body.username.includes(" ")) {
        return next(errorHandler(400, "Username cannot contains spaces"));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, "Username must be lowercase"));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
            errorHandler(400, "Username can only contains letters and numbers")
        );
        }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser.toObject();
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
};



export const deleteUser = async (req, res, next) => {
  if (!req.user.isAdmin && req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Extract publicId from Cloudinary URL
    const imageUrl = user.profilePicture; // Assuming profilePicture stores Cloudinary URL
    const publicId = imageUrl?.split("/").pop().split(".")[0]; // Extract Cloudinary publicId

    if (publicId) {
      await cloudinary.uploader.destroy(publicId); // ✅ Delete from Cloudinary
    }

    await User.findByIdAndDelete(req.params.userId); // ✅ Delete user from DB
    res.status(200).json({ message: "User has been deleted along with profile picture" });

  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
    try {
      res.clearCookie('access_token').status(200).json({ message: "Signout successful" });
    } catch (error) {
      next(error);
    }
}
/*
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this user"));
  }

  try {
    // Find user in the database
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(errorHandler(404, "User not found"));
    }

    // Function to extract publicId from image URL
    const extractPublicId = (imageUrl) => {
      const parts = imageUrl.split("/");
      const uploadIndex = parts.indexOf("upload");
      if (uploadIndex === -1) return null; // Invalid URL
      return parts.slice(uploadIndex + 1).join("/").split(".")[0];
    };

    // Get publicId (either from DB or extract from image URL)
    let publicId = user.profilePicture?.publicId;
    if (!publicId && user.profilePicture?.url) {
      publicId = extractPublicId(user.profilePicture.url);
    }

    // Delete profile picture from Cloudinary if exists
    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete user from database
    await User.findByIdAndDelete(req.params.userId);

    res.status(200).json({ message: "User and profile picture deleted successfully" });
  } catch (error) {
    next(error);
  }
};


/*
export const deleteUser = async (req, res, next) => {
  if(req.user.id !== req.params.userId) {
    return next(errorHandler(403, "you are not allowed to delete user"));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User has been deleted" });
  } catch (error) {
    next(error);
  }
}*/
export const getUsers = async (req, res, next) => {
  if(!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to get users"));
  }
  try {
    const startIndex = parseInt(req.query.start) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1; 
    
    const users = await User.find({})
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: sortDirection });
      // Exclude password and __v field
      const usersWithoutPassword = users.map((user) => {
        const {password, ...rest } = user._doc
        return rest;
      })

    const totalUsers = await User.countDocuments({}); 
    
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo }
    });

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
}

