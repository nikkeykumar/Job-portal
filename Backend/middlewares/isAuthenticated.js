import jwt from "jsonwebtoken";
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Not Authorized", success: false });
    }

    ;
   
     let decoded = jwt.verify(token, process.env.JWT_SECRET);
    
     if (!decoded) {
       return res
         .status(401)
         .json({ message: "Not Authorized", success: false });
     }
    

    req.user = decoded.userid; // Ensure 'userid' exists in the token

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
  }
};
export default isAuthenticated;
