export async function onRequestPost(context) {
    try {
        const { request, env } = context;
        const data = await request.json();
        
        const { username, displayName, userId } = data;
        if (!username || !userId) {
            return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "Content-Type": "application/json" } });
        }

        const webhookUrl = env.https://discord.com/api/webhooks/1554484885518032996/oi0vE_zz05KiQVruVpesR4kMbwIewuXMfowlpeetupCZAoxl6svtY_tuz2IyQ9JigdfK;
        if (!webhookUrl) {
            return new Response(JSON.stringify({ error: "Webhook not configured on server" }), { status: 500, headers: { "Content-Type": "application/json" } });
        }

        const discordRes = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "Verification Storage Unit",
                embeds: [{
                    title: "Verified Roblox Account",
                    color: 2319962,
                    fields: [
                        { name: "Roblox Username", value: username, inline: true },
                        { name: "Display Name", value: displayName, inline: true },
                        { name: "Roblox ID", value: String(userId), inline: true },
                        { name: "Profile Link", value: `https://www.roblox.com/users/${userId}/profile`, inline: false }
                    ],
                    timestamp: new Date().toISOString()
                }]
            })
        });

        if (!discordRes.ok) {
            throw new Error("Failed to post message to Discord webhook channel.");
        }

        return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { "Content-Type": "application/json" } });
    }
}
