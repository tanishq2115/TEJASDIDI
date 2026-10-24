const entries=[
['लॉकडाऊन लिजेंड','घरी राहा, पण फोटो मात्र इतिहासात जाऊ द्या!','old'],
['गोल्डन मास्क मिशन','फिल्टर इतका भारी की ओळखपत्रही गोंधळेल.','style'],
['स्माईल अलर्ट','हसण्याचा हा पुरावा जपून ठेवण्यात आला आहे.','fun'],
['विश्रांती विभाग','काम कमी आणि आराम जास्त — अशी काल्पनिक शंका!','fun'],
['क्लोज-अप ऑपरेशन','कॅमेरा जवळ आला आणि फाईल तयार झाली.','fun'],
['नाईट मोड एजंट','रात्री मोबाईलवर काय चाललंय? बहुधा मीम्स!','fun'],
['रॉयल साइड प्रोफाइल','एक पोझ, शंभर टक्के आत्मविश्वास.','style'],
['चेक शर्ट क्रॉनिकल्स','या शर्टनेही स्वतंत्र प्रसिद्धी मिळवली.','style'],
['डंबेल डिपार्टमेंट','फोटोमध्ये फिटनेसचा पुरावा सादर!','style'],
['हेअरस्टाईल फाईल','केसांची स्टाईल हा स्वतंत्र तपासाचा विषय.','style'],
['ब्लू चेक शर्ट केस','हा लूक गुप्त संग्रहात कायमचा नोंदवला गेला.','old'],
['मोबाईल इंटेलिजन्स','फोनमध्ये काय आहे? कदाचित अजून फोटो!','fun'],
['स्माईल ऑन लोकेशन','हसणं इतकं जोरात की कॅमेराही खुश.','old'],
['बाईक पोस्टर मिशन','पोस्टर लेव्हल स्टाईल — तपास थांबवण्यात आला.','style']
].map(([title,description,category],i)=>({id:i+1,title,description,category,img:`assets/file-${String(i+1).padStart(2,'0')}.jpg`}));
const gallery=document.querySelector('#gallery'), search=document.querySelector('#search'),empty=document.querySelector('#empty'),viewer=document.querySelector('#viewer');let category='all',visible=entries,active=0;
function render(){let q=search.value.trim().toLocaleLowerCase('mr');visible=entries.filter(e=>(category==='all'||e.category===category)&&(e.title.toLocaleLowerCase('mr').includes(q)||e.description.toLocaleLowerCase('mr').includes(q)||String(e.id).includes(q)));gallery.innerHTML=visible.map(e=>`<button class="evidence" data-id="${e.id}" aria-label="फाईल ${e.id} उघडा"><div class="thumb"><img src="${e.img}" alt="फोटो पुरावा ${e.id}" loading="lazy"><span class="num">EVIDENCE ${String(e.id).padStart(2,'0')}</span></div><div class="evidence-body"><p>DECLASSIFIED / TG-${String(e.id).padStart(3,'0')}</p><h3>${e.title}</h3><span>फाईल उघडा ↗</span></div></button>`).join('');empty.hidden=visible.length>0;gallery.querySelectorAll('.evidence').forEach(el=>el.addEventListener('click',()=>openFile(Number(el.dataset.id))));}
function openFile(id){active=entries.findIndex(e=>e.id===id);updateModal();viewer.showModal();document.body.classList.add('modal-open');}
function updateModal(){let e=entries[active];document.querySelector('#fullImage').src=e.img;document.querySelector('#fullImage').alt=e.title;document.querySelector('#fileCode').textContent=`EVIDENCE ${String(e.id).padStart(2,'0')} / TOP SECRET (PARODY)`;document.querySelector('#fileTitle').textContent=e.title;document.querySelector('#fileDescription').textContent=e.description;}
function navigate(n){active=(active+n+entries.length)%entries.length;updateModal();}
search.addEventListener('input',render);document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter.active').classList.remove('active');b.classList.add('active');category=b.dataset.filter;render();}));document.querySelector('#close').addEventListener('click',()=>viewer.close());document.querySelector('#prev').addEventListener('click',()=>navigate(-1));document.querySelector('#next').addEventListener('click',()=>navigate(1));viewer.addEventListener('close',()=>document.body.classList.remove('modal-open'));viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close()});document.addEventListener('keydown',e=>{if(!viewer.open)return;if(e.key==='ArrowLeft')navigate(-1);if(e.key==='ArrowRight')navigate(1)});render();
