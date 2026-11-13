// Cloudflare Worker proxy: keeps your Anthropic API key secret.
// Deploy: wrangler deploy ; wrangler secret put ANTHROPIC_API_KEY
const CORS={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'POST,OPTIONS'};
export default {
  async fetch(req, env){
    if(req.method==='OPTIONS') return new Response(null,{headers:CORS});
    const {object,facts,messages}=await req.json();
    const system=`You are "AI Astronomer" inside a NASA Space Apps educational space-shooter game. The player just discovered: ${object}. Verified facts: ${facts}. Answer in 2-4 short, friendly sentences for students. Use the verified facts when relevant. If you are not sure about something, say so instead of guessing. Stay on space science.`;
    const r=await fetch('https://api.anthropic.com/v1/messages',{method:'POST',
      headers:{'x-api-key':env.ANTHROPIC_API_KEY,'anthropic-version':'2023-06-01','content-type':'application/json'},
      body:JSON.stringify({model:'claude-haiku-5-5',max_tokens:300,system,messages:(messages||[]).slice(-6)})});
    const j=await r.json();
    const text=(j.content||[]).map(c=>c.text||'').join('')||'Sorry, I could not answer that.';
    return new Response(JSON.stringify({text}),{headers:{...CORS,'Content-Type':'application/json'}});
  }
}
