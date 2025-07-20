export default function formatResponse(data) {
    const { 
        username, 
        password, 
        serverName, 
        serverId, 
        ram, 
        disk, 
        cpu, 
        panelUrl 
    } = data;
    
    return `
        <div class="formatted-response">
            <div class="response-line">
                <div class="response-bullet">┌─</div>
                <div class="response-success">「 ✅ *Pterodactyl Account Created!* 」</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">├─❏</div>
                <div class="response-username">  *Account Details*</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  👤 <span class="response-username">*Username:* ${username}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  🔐 <span class="response-password">*Password:* ${password}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">├─❏</div>
                <div class="response-server">  *Server Information*</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  🖥️ <span class="response-server">*Server Name:* ${serverName}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  🆔 <span class="response-server">*Server ID:* ${serverId}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  💾 <span class="response-resource">*RAM:* ${ram}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  💿 <span class="response-resource">*Disk:* ${disk}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  ⚙️ <span class="response-resource">*CPU:* ${cpu}</span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">├─❏</div>
                <div class="response-link">  *Login Information*</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  🌐 <span class="response-link">*Panel Link:* <a href="${panelUrl}" target="_blank">${panelUrl}</a></span></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
                <div>  🔑 <em>Use the credentials above to log in.</em></div>
            </div>
            <div class="response-line">
                <div class="response-bullet">│</div>
            </div>
            <div class="response-line">
                <div class="response-bullet">└─</div>
                <div class="response-footer">「 *Created by corex with 💙* 」</div>
            </div>
        </div>
    `;
}
