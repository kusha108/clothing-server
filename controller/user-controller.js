import User from '../model/user-schema.js';

export const userSignup = async (request, response) => {
  try {
    const userData = request.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username: request.body.username });
    if (existingUser) {
      return response.status(401).json({ message: "User already exists" }); // 401 Unauthorized
    }

    const newUser = new User(userData);
    await newUser.save();

    response.status(200).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup Error:", error.message); // Log for debugging
    response.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const userLogin = async (request, response) => {
  try {
    const username = request.body.username;
    const password = request.body.password;

    let user = await User.findOne({ username: username, password: password });
    if (user) {
      return response.status(200).json({ data: user });
    } else {
      return response.status(401).json({ message: "Invalid login" }); // 401 Unauthorized
    }

  } catch (error) {
    response.status(500).json({ message: "Something went wrong", error: error.message });
  }
}; // ← this closing bracket was missing
