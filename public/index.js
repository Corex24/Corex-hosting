<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CoreX-Hosting Admin</title>
    <link rel="stylesheet" href="/styles.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="container">
        <div class="login-screen" id="loginScreen">
            <div class="logo">
                <i class="fas fa-dragon"></i>
                <h1>CoreX-Hosting</h1>
            </div>
            
            <div class="card">
                <h2>Admin Login</h2>
                <div class="input-group">
                    <label for="username"><i class="fas fa-user"></i> Username</label>
                    <input type="text" id="username" placeholder="Enter admin username">
                </div>
                
                <div class="input-group">
                    <label for="password"><i class="fas fa-lock"></i> Password</label>
                    <input type="password" id="password" placeholder="Enter admin password">
                </div>
                
                <button id="loginBtn">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
                
                <div id="loginResult"></div>
            </div>
            
            <div class="footer">
                <p>Created with <i class="fas fa-heart" style="color: #e74c3c;"></i> by CoreX</p>
            </div>
        </div>
        
        <div class="dashboard-screen" id="dashboardScreen" style="display:none">
            <header>
                <div class="brand">
                    <i class="fas fa-dragon"></i>
                    <h1>CoreX-Hosting</h1>
                </div>
                <div class="user-info">
                    <span>Admin: Corex24</span>
                    <button id="logoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</button>
                </div>
            </header>
            
            <div class="dashboard-content">
                <div class="card">
                    <h2><i class="fas fa-plus-circle"></i> Create New Server</h2>
                    
                    <div class="input-group">
                        <label for="newUser"><i class="fas fa-user"></i> Account Username</label>
                        <input type="text" id="newUser" placeholder="Enter username for new account">
                    </div>
                    
                    <div class="input-group">
                        <label for="serverName"><i class="fas fa-server"></i> Server Name</label>
                        <input type="text" id="serverName" placeholder="Enter server name">
                    </div>
                    
                    <div class="input-group">
                        <label for="plan"><i class="fas fa-layer-group"></i> Resource Plan</label>
                        <select id="plan">
                            <option value="free">Free Plan (308MB RAM, 716MB Disk)</option>
                            <option value="unlimited">Unlimited Resources</option>
                        </select>
                    </div>
                    
                    <button id="createServerBtn">
                        <i class="fas fa-rocket"></i> Create Server
                    </button>
                    
                    <div id="serverResult"></div>
                </div>
                
                <div class="card server-display">
                    <h2><i class="fas fa-list"></i> Recently Created</h2>
                    <div id="recentServers"></div>
                </div>
            </div>
            
            <div class="footer">
                <p>CoreX-Hosting v1.0 | Secured Admin Panel</p>
            </div>
        </div>
    </div>

    <script>
        // DOM Elements
        const loginScreen = document.getElementById('loginScreen');
        const dashboardScreen = document.getElementById('dashboardScreen');
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const createServerBtn = document.getElementById('createServerBtn');
        const loginResult = document.getElementById('loginResult');
        const serverResult = document.getElementById('serverResult');
        const recentServers = document.getElementById('recentServers');
        
        // State
        let createdServers = [];
        
        // Login Function
        loginBtn.addEventListener('click', async () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            loginResult.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Authenticating...</div>';
            
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });
                
                const data = await response.json();
                
                if (data.status === "success") {
                    loginScreen.style.display = 'none';
                    dashboardScreen.style.display = 'block';
                } else {
                    loginResult.innerHTML = `<div class="error"><i class="fas fa-times-circle"></i> ${data.message}</div>`;
                }
            } catch (error) {
                loginResult.innerHTML = '<div class="error"><i class="fas fa-times-circle"></i> Connection error</div>';
            }
        });
        
        // Logout Function
        logoutBtn.addEventListener('click', () => {
            dashboardScreen.style.display = 'none';
            loginScreen.style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            loginResult.innerHTML = '';
        });
        
        // Create Server Function
        createServerBtn.addEventListener('click', async () => {
            const username = document.getElementById('newUser').value;
            const serverName = document.getElementById('serverName').value;
            const plan = document.getElementById('plan').value;
            
            if (!username || !serverName) {
                serverResult.innerHTML = '<div class="error"><i class="fas fa-exclamation-triangle"></i> Please fill all fields</div>';
                return;
            }
            
            serverResult.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Creating server...</div>';
            
            try {
                const response = await fetch('/api/create-server', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, serverName, plan })
                });
                
                const data = await response.json();
                
                if (data.status === "success") {
                    // Save to recent servers
                    createdServers.unshift({
                        username,
                        serverName,
                        plan,
                        timestamp: new Date().toLocaleString()
                    });
                    
                    // Keep only last 3
                    if (createdServers.length > 3) createdServers.pop();
                    
                    updateRecentServers();
                    
                    // Display the formatted result
                    serverResult.innerHTML = data.formattedResponse;
                } else {
                    serverResult.innerHTML = `<div class="error"><i class="fas fa-times-circle"></i> ${data.message}</div>`;
                }
            } catch (error) {
                serverResult.innerHTML = '<div class="error"><i class="fas fa-times-circle"></i> Connection error</div>';
            }
        });
        
        // Update recent servers list
        function updateRecentServers() {
            if (createdServers.length === 0) {
                recentServers.innerHTML = '<p>No servers created yet</p>';
                return;
            }
            
            let html = '<div class="server-list">';
            createdServers.forEach(server => {
                html += `
                    <div class="server-item">
                        <div class="server-header">
                            <i class="fas fa-server"></i>
                            <strong>${server.serverName}</strong>
                        </div>
                        <div class="server-details">
                            <div><i class="fas fa-user"></i> ${server.username}</div>
                            <div><i class="fas fa-microchip"></i> ${server.plan === 'unlimited' ? 'Unlimited' : 'Free'} Plan</div>
                            <div><i class="fas fa-clock"></i> ${server.timestamp}</div>
                        </div>
                    </div>
                `;
            });
            html += '</div>';
            recentServers.innerHTML = html;
        }
        
        // Initialize recent servers display
        updateRecentServers();
    </script>
</body>
</html>
