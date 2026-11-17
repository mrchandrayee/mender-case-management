(() => {
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const data=[
 {name:"Checkout button frozen",client:"Pinecrest Outfitters",owner:"Maya Okafor",team:"Team Fern",budget:38900,status:"In progress",updated:"12 min ago",members:["MO","TF","JD"],type:"Technical"},
 {name:"Invoice not syncing",client:"North Shore Studio",owner:"Liam Chen",team:"Team Fern",budget:22500,status:"In progress",updated:"38 min ago",members:["LC","MO","TF"],type:"Billing"},
 {name:"Website loading slowly",client:"Whitlocks Safety",owner:"Ava Williams",team:"Team Cedar",budget:9800,status:"In progress",updated:"1 hr ago",members:["AW","JD","MK"],type:"Technical"},
 {name:"Wholesale order refund",client:"Heron & Co.",owner:"Maya Okafor",team:"Team Fern",budget:8400,status:"Waiting",updated:"2 hrs ago",members:["MO","TF"],type:"Billing"},
 {name:"Calendar double booking",client:"Old Market Theatre",owner:"Dev Patel",team:"Team Cedar",budget:12350,status:"Resolved",updated:"Yesterday",members:["DP","AW","MO"],type:"Account"},
 {name:"Push alerts arrive late",client:"Pinecrest Outfitters",owner:"Liam Chen",team:"Team Fern",budget:9874,status:"In progress",updated:"Yesterday",members:["LC","TF","JD"],type:"Technical"},
 {name:"CSV export times out",client:"Whitlocks Safety",owner:"Ava Williams",team:"Team Cedar",budget:4400,status:"Waiting",updated:"2 days ago",members:["AW","MK"],type:"Technical"},
 {name:"New user access request",client:"North Shore Studio",owner:"Dev Patel",team:"Team Fern",budget:3200,status:"Resolved",updated:"3 days ago",members:["DP","MO"],type:"Account"}
];
let activeFilter="all",showAll=false,search="",currentPage="cases";
const avatarColors=["#b9d5bd","#e0b9a2","#9fb8d2","#d2c28c","#c4a9d4","#91c4b5"];
function money(v){return "$"+v.toLocaleString("en-US")}
function avatar(initial,i){return `<span class="avatar" style="background:${avatarColors[i%avatarColors.length]}">${initial}</span>`}
function renderCases(){
 let list=data.filter(c=>{
  let q=(c.name+" "+c.client+" "+c.owner+" "+c.team).toLowerCase().includes(search);
  let f=activeFilter==="all"||(activeFilter==="open"&&c.status!=="Resolved")||(activeFilter==="mine"&&c.owner==="Maya Okafor")||(activeFilter==="resolved"&&c.status==="Resolved");
  return q&&f;
 });
 const sort=$("#sortCases")?.value||"recent";
 if(sort==="budget")list.sort((a,b)=>b.budget-a.budget);if(sort==="name")list.sort((a,b)=>a.name.localeCompare(b.name));
 const shown=showAll?list:list.slice(0,8);
 $("#caseList").innerHTML=shown.map((c,i)=>`<div class="case-row" data-name="${c.name}"><div class="case-title"><span class="case-icon">${c.type==="Technical"?"⌘":c.type==="Billing"?"$":"◈"}</span><div><b>${c.name}</b><small>${c.client}</small></div></div><div class="case-cell hide-mobile">${c.owner}<small>Case owner</small></div><div class="case-cell hide-tablet">${c.team}<small>Responsible team</small></div><div class="case-cell"><b>${money(c.budget)}</b><small>Budget</small></div><div><span class="pill ${c.status==="Resolved"?"green":c.status==="Waiting"?"amber":"working"}">${c.status}</span></div><span class="row-arrow">›</span></div>`).join("")||`<div class="empty">No matching cases. Try another search.</div>`;
 $("#caseCount").textContent=`Showing ${shown.length} of ${list.length} cases`;
 $("#loadMore").style.display=list.length>8&&!showAll?"inline":"none";
 $$(".case-row").forEach(row=>row.addEventListener("click",()=>{const c=data.find(x=>x.name===row.dataset.name);$("#journeyTitle").textContent=c.name;go("journeys")}));
}
function go(page){
 if(!$("#"+page))return;
 currentPage=page;$$(".page").forEach(x=>x.classList.toggle("hidden",x.id!==page));
 $$(".navtab").forEach(x=>x.classList.toggle("active",x.dataset.page===page));
 $("#crumb").textContent=page==="cases"?"Cases overview":page==="journeys"?"Customer journey":"Support insights";
}
$$(".navtab").forEach(b=>b.onclick=()=>go(b.dataset.page));
$$(".rail[data-page]").forEach(b=>b.onclick=()=>go(b.dataset.page));
$("#caseSearch").addEventListener("input",e=>{search=e.target.value.toLowerCase();renderCases()});
$("#sortCases").onchange=renderCases;
$$(".filter").forEach(b=>b.onclick=()=>{activeFilter=b.dataset.filter;$$(".filter").forEach(x=>x.classList.toggle("active",x===b));renderCases()});
$("#loadMore").onclick=()=>{showAll=true;renderCases()};
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove("show"),1800)}
function modal(title,body){$("#modalContent").innerHTML=`<h2>${title}</h2>${body}`;$("#modal").classList.add("open")}
function close(){ $("#modal").classList.remove("open") }
$("#closeModal").onclick=close;$("#modal").onclick=e=>{if(e.target.id==="modal")close()};
const newCaseBody=`<form id="caseForm">
<label>Case name</label><input name="name" id="caseName" placeholder="e.g. Checkout button frozen" required>
<label>Client</label><input name="client" id="clientName" placeholder="Company name" required>
<div class="field-grid"><div><label>Case owner</label><div class="select-person">${avatar("MO",0)} Maya Okafor <span style="margin-left:auto;color:#80978a">⌄</span></div></div><div><label>Responsible team</label><div class="select-person">${avatar("TF",1)} Team Fern <span style="margin-left:auto;color:#80978a">⌄</span></div></div></div>
<label>Allocated budget</label><div class="budget-control">$ <input id="budget" type="number" value="22500" min="0" step="100"></div>
<label>Description</label><textarea id="description" placeholder="What is happening, and how bad is it?"></textarea>
<div class="actions"><button type="button" class="outline" id="cancelCase">Cancel</button><button type="submit" class="primary">Open case</button></div></form>`;
function openNew(){modal("Open a new case",newCaseBody);$("#cancelCase").onclick=close;$("#caseForm").onsubmit=e=>{e.preventDefault();const name=$("#caseName").value.trim(),client=$("#clientName").value.trim(),budget=Math.max(0,Number($("#budget").value)||0);if(!name||!client)return;data.unshift({name,client,owner:"Maya Okafor",team:"Team Fern",budget,status:"In progress",updated:"Just now",members:["MO","TF"],type:"Technical"});close();activeFilter="all";$$(".filter").forEach(x=>x.classList.toggle("active",x.dataset.filter==="all"));showAll=true;renderCases();toast("Case opened successfully");};}
$("#newCase").onclick=openNew;$("#journeyNew").onclick=openNew;
$("#confirmClient").onclick=()=>toast("Receipt confirmation marked as sent");
$("#progressUpdate").onclick=()=>toast("Progress update queued · demo");
$("#addDependency").onclick=()=>modal("Add dependency",`<label>Dependency name</label><input id="depName" placeholder="e.g. QA review"><label>Owner</label><input placeholder="Team or person"><div class="actions"><button class="outline" id="cancelDep">Cancel</button><button class="primary" id="saveDep">Add dependency</button></div>`);
document.addEventListener("click",e=>{if(e.target.id==="cancelDep")close();if(e.target.id==="saveDep"){let v=$("#depName").value.trim();if(!v){toast("Enter a dependency name");return}close();toast(v+" added to case") }});
function renderPeople(){const people=["MO","TF","JD","AW","LC","DP","MK","NS","EB","SK","AP"];$("#peopleLine").innerHTML=people.map((p,i)=>avatar(p,i)).join("")}
function drawInsight(){
 const svg=$("#insightChart");let opened=[44,52,48,67,62,78,71,83,75,89,81,96],resolved=[34,42,45,50,58,61,68,73,70,79,77,88],path=(arr)=>arr.map((v,i)=>(i?"L":"M")+(35+i*67)+","+(195-v*1.55)).join(" ");
 let grid=[35,75,115,155,195].map(y=>`<path d="M20 ${y}H810" stroke="#294036" stroke-dasharray="3 5"/>`).join("");
 let xlabels=["W1","W2","W3","W4","W5","W6","W7","W8","W9","W10","W11","W12"].map((v,i)=>`<text x="${35+i*67}" y="220" fill="#82968a" font-size="8" text-anchor="middle">${v}</text>`).join("");
 svg.innerHTML=`${grid}<path d="${path(opened)}" fill="none" stroke="#58d0ae" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="${path(resolved)}" fill="none" stroke="#e58a72" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>${opened.map((v,i)=>`<circle cx="${35+i*67}" cy="${195-v*1.55}" r="3" fill="#58d0ae"/>`).join("")}${xlabels}`;
}
function renderWorkload(){const vals=[["Maya Okafor",88],["Liam Chen",74],["Ava Williams",68],["Dev Patel",56],["Jordan Diaz",43],["Team Fern",79]];$("#workload").innerHTML=vals.map(([n,v])=>`<div class="workrow"><span>${n}</span><div class="workbar"><i style="width:${v}%"></i></div><b>${v}%</b></div>`).join("")}
$("#exportInsights").onclick=()=>{let rows=["Metric,Value","Cases resolved,85%","Average response time,16.1 hrs","Customer satisfaction,4.8/5","Active cases,128",...data.map(c=>`"${c.name}","${c.status}"`)].join("\n");let blob=new Blob([rows],{type:"text/csv"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="mender-support-insights.csv";a.click();URL.revokeObjectURL(url);toast("Insights report exported")};
$("#searchBtn").onclick=()=>{go("cases");$("#caseSearch").focus()};
$("#bellBtn").onclick=()=>modal("Notifications",`<p>All caught up. Your team has no new alerts.</p>`);
$("#helpBtn").onclick=()=>modal("Mender help centre",`<p>Manage cases, customer journeys and support insights from your workspace.</p>`);
renderCases();renderPeople();drawInsight();renderWorkload();
})();