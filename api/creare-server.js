import formatResponse from '../../utils/response-formatter';

export default function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ 
            status: "error", 
            message: "Method not allowed" 
        });
    }

    const { username, serverName, plan } = req.body;
    
    if (!username || !serverName) {
        return res.status(400).json({ 
            status: "error", 
            message: "Username and server name are required" 
        });
    }
    
    // Generate random password (10 characters)
    const password = Math.random().toString(36).slice(-10);
    
    // Generate random server ID
    const serverId = Math.floor(1000 + Math.random() * 9000);
    
    // Determine resources based on plan
    const ram = plan === 'unlimited' ? 'Unlimited' : '308 MB';
    const disk = plan === 'unlimited' ? 'Unlimited' : '716 MB';
    const cpu = plan === 'unlimited' ? 'Unlimited' : '25%';
    
    // Panel URL
    const panelUrl = "https://panel.corex-hosting.com";
    
    // Create formatted response
    const formattedResponse = formatResponse({
        username,
        password,
        serverName,
        serverId,
        ram,
        disk,
        cpu,
        panelUrl
    });
    
    return res.status(200).json({ 
        status: "success",
        message: "Server created successfully",
        formattedResponse
    });
}
