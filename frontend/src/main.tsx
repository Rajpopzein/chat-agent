import React from 'react';import{createRoot}from'react-dom/client';import'./styles.css';

type Kind='human'|'agent';
type Member={name:string;role:string;kind:Kind;color:string};
type Msg={from:string;text:string;time:string};

const members:Member[]=[
{name:'Raj',role:'You',kind:'human',color:'#8083ff'},
{name:'Developer',role:'Full-stack engineer',kind:'agent',color:'#4cd7f6'},
{name:'Designer',role:'Product designer',kind:'agent',color:'#c0c1ff'},
{name:'Tester',role:'Quality reviewer',kind:'agent',color:'#4edea3'}
];
const seed:Msg[]=[
{from:'Raj',text:'We need a simple expense tracker. Discuss the first version and keep it small.',time:'12:41'},
{from:'Designer',text:'I would start with one dashboard: available balance, recent transactions, and a single Add transaction action.',time:'12:41'},
{from:'Developer',text:'Agreed. For V1 I can keep persistence simple and expose transactions through a small API. No auth or bank sync yet.',time:'12:42'},
{from:'Tester',text:'Acceptance criteria: add income/expense, balance recalculates correctly, refresh preserves data, and duplicate submits are blocked.',time:'12:42'}
];

function Avatar({m}:{m:Member}){return <div className="avatar" style={{background:m.color}}>{m.kind==='agent'?'AI':m.name.slice(0,2).toUpperCase()}</div>}

function App(){
 const [messages,setMessages]=React.useState(seed); const [draft,setDraft]=React.useState('');
 const send=()=>{const text=draft.trim();if(!text)return;setMessages(v=>[...v,{from:'Raj',text,time:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}]);setDraft('')};
 return <div className="app">
  <aside className="rail"><div><div className="brand"><span className="brandMark">CA</span><strong>Chat Agent</strong></div><nav><button className="active">◉ Chats</button><button>◎ Groups</button><button>◇ Agents</button><button>⚙ Settings</button></nav></div><div className="me"><Avatar m={members[0]}/><div><b>Raj</b><small><i/>Available</small></div></div></aside>
  <section className="directory"><div className="dirHead"><div><b>Conversations</b><span>4</span></div><input placeholder="Search chats..."/></div>
   <p className="label">GROUPS</p>
   <div className="conversation selected"><div className="groupAvatar">#</div><div><b>Build Expense Tracker</b><small>Tester: Acceptance criteria...</small></div></div>
   <div className="conversation"><div className="groupAvatar">#</div><div><b>Chat Agent Core</b><small>Developer: Runtime looks good.</small></div></div>
   <p className="label">DIRECT</p>
   {members.slice(1).map(m=><div className="conversation" key={m.name}><Avatar m={m}/><div><b>{m.name} <em>AI</em></b><small>{m.role}</small></div></div>)}
  </section>
  <main className="chat"><header><div><div className="groupAvatar">#</div><div><h2>Build Expense Tracker</h2><p>4 members · 3 AI agents</p></div></div><div className="headerActions"><button>⌕</button><button>⋯</button></div></header>
   <div className="messages">{messages.map((x,i)=>{const m=members.find(a=>a.name===x.from)!;return <div className="message" key={i}><Avatar m={m}/><div><div className="meta"><b>{x.from}</b>{m.kind==='agent'&&<em>AI AGENT</em>}<time>{x.time}</time></div><p>{x.text}</p></div></div>})}<div className="system">AI agents respond only when mentioned or explicitly activated.</div></div>
   <footer><div className="composer"><textarea value={draft} onChange={e=>setDraft(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Message the group… Try @Developer"/><div><span>+ &nbsp; @ Mention</span><button onClick={send}>Send ↑</button></div></div><small>Enter to send · Shift + Enter for new line</small></footer>
  </main>
  <aside className="details"><p className="label">ROOM MEMBERS</p>{members.map(m=><div className="member" key={m.name}><Avatar m={m}/><div><b>{m.name}{m.kind==='agent'&&<em>AI</em>}</b><small>{m.role}</small></div><i/></div>)}<hr/><p className="label">AGENT MODE</p><div className="mode"><b>Mention only</b><p>Agents stay quiet unless @mentioned. This prevents accidental agent loops.</p><span>ACTIVE</span></div><hr/><p className="label">ROOM CONTEXT</p><p className="muted">Every member can read messages in this room. Agent responses are scoped to this conversation.</p></aside>
 </div>
}
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);