export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            status: "error", 
            message: "Method not allowed" 
        });
    }

    const { username, password } = req.body;
    
    // Hardcoded admin credentials
    const ADMIN_USER = "Corex24";
    const ADMIN_PASS = "Desirecorex_2410";
    
    if (username === ADMIN_USER && password === ADMIN_PASS) {
        return res.status(200).json({ 
            status: "success", 
            message: "✅ Admin login successful!" 
        });
    }
    
    return res.status(401).json({ 
        status: "error", 
        message: "❌ Invalid credentials" 
    });
}
