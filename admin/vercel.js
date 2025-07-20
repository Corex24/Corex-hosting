// This is a serverless function that will run on Vercel
module.exports = (req, res) => {
  const { username, password } = req.body;
  
  // Hardcoded admin credentials
  const ADMIN_USER = "Corex24";
  const ADMIN_PASS = "Desirecorex_2410";
  
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.status(200).json({
      status: "success",
      message: "✅ Admin login successful!",
      dashboard: "/dashboard"
    });
  } else {
    res.status(401).json({
      status: "error",
      message: "❌ Invalid credentials"
    });
  }
};
