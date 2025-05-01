import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    
    // Save refresh token to database
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error generating tokens: " + error.message);
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role, usn, description } = req.body;
  
  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json(
      new ApiResponse(400, null, "All input is required")
    );
  }
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json(
      new ApiResponse(409, null, "User already exists")
    );
  }
  
  // Create user
  const userData = {
    name,
    email,
    password,
    role: role || "user"
  };
  
  if (usn) userData.usn = usn;
  if (description) userData.description = description;
  
  const user = await User.create(userData);
  
  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);
  
  // Set cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };
  
  return res
    .status(201)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 15 * 60 * 1000 // 15 minutes
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json(
      new ApiResponse(201, 
        { user: { _id: user._id, name: user.name, email: user.email, role: user.role } }, 
        "User registered successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json(
      new ApiResponse(400, null, "Email and password are required")
    );
  }
  
  // Find user
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(401).json(
      new ApiResponse(401, null, "Invalid credentials")
    );
  }
  
  // Check password
  const isPasswordValid = await user.isPasswordCorrect(password);
  
  if (!isPasswordValid) {
    return res.status(401).json(
      new ApiResponse(401, null, "Invalid credentials")
    );
  }
  
  // Generate tokens
  const { accessToken, refreshToken } = await generateTokens(user._id);
  
  // Set cookies
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };
  
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      ...options,
      maxAge: 15 * 60 * 1000 // 15 minutes
    })
    .cookie("refreshToken", refreshToken, {
      ...options,
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
    .json(
      new ApiResponse(200, 
        { user: { _id: user._id, name: user.name, email: user.email, role: user.role } }, 
        "Login successful"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined
      }
    },
    {
      new: true
    }
  );
  
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production"
  };
  
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
  
  if (!incomingRefreshToken) {
    return res.status(401).json(
      new ApiResponse(401, null, "Unauthorized request")
    );
  }
  
  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    
    const user = await User.findById(decodedToken._id);
    
    if (!user) {
      return res.status(401).json(
        new ApiResponse(401, null, "Invalid refresh token")
      );
    }
    
    if (incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json(
        new ApiResponse(401, null, "Refresh token is expired or used")
      );
    }
    
    const { accessToken, refreshToken } = await generateTokens(user._id);
    
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    };
    
    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        ...options,
        maxAge: 15 * 60 * 1000
      })
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json(
        new ApiResponse(200, { accessToken, refreshToken }, "Access token refreshed")
      );
  } catch (error) {
    return res.status(401).json(
      new ApiResponse(401, null, "Invalid refresh token")
    );
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password -refreshToken");
  
  if (!user) {
    return res.status(404).json(
      new ApiResponse(404, null, "User not found")
    );
  }
  
  return res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});