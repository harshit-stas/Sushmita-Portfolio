import nodemailer from 'nodemailer';

export default async function handler(req,res){
 if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
 const transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{user:process.env.EMAIL_USER,pass:process.env.EMAIL_PASS}
 });
 const {name,email,company,type,budget,message}=req.body;
 await transporter.sendMail({
   from:process.env.EMAIL_USER,
   to:process.env.EMAIL_USER,
   subject:'New Portfolio Enquiry',
   html:`<h2>New Collaboration Request</h2>
   <p><b>Name:</b> ${name}</p>
   <p><b>Email:</b> ${email}</p>
   <p><b>Company:</b> ${company||''}</p>
   <p><b>Type:</b> ${type||''}</p>
   <p><b>Budget:</b> ${budget||''}</p>
   <p>${message}</p>`
 });
 res.status(200).json({success:true});
}
