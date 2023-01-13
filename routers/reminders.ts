import express,{ Router,Request,Response } from "express";
import CreateReminderDto from "../dto/create-reminder";
// import Reminder from "../models/reminder";
import { readFile,writeFile } from "fs";
import path from "path";
const router = Router();
router.get('/',async(_,res: express.Response)=>{
    return readFile(path.join(__dirname,"..","data","store.json"),"utf-8",(err,data)=>{
        if (err) {
            res.writeHead(500,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: false,
                err
            }))
        }
        res.writeHead(200,{"Content-Type":"application/json"});
        return res.end(JSON.stringify({
            success: true,
            message: JSON.parse(data)
        }))
    })
});
router.post('/',(req,res)=>{
    return readFile(path.join(__dirname,"..","data","store.json"),"utf-8",(err,data)=>{
        if (err) {
            res.writeHead(500,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: false,
                err
            }))
        }
        let tasks: CreateReminderDto[] = JSON.parse(data);
        let latest_id = tasks.reduce((max=0,task:CreateReminderDto)=> (task.id>max? task.id:max),0);
        latest_id = latest_id? latest_id+1 : 0;
        console.log(latest_id);
        const {title,completed} =  (req.body as CreateReminderDto);
        tasks.push({
            title,
            completed,
            id:latest_id
        })
        return writeFile(path.join(__dirname,"..","data","store.json"),JSON.stringify(tasks),(err)=>{
            if (err) {
                res.writeHead(500,{"Content-Type":"application/json"});
                return res.end(JSON.stringify({
                    success: false,
                    err
                }))
            }
            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: true,
                message: 'success'
            }))
        })
        // return res.json(JSON.parse(data));
    })
})
router.put('/',(req:Request,res: Response)=>{
    return readFile(path.join(__dirname,"..","data","store.json"),"utf-8",(err,data)=>{
        if (err) {
            res.writeHead(500,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: false,
                err
            }))
        }
        let tasks: CreateReminderDto[] = JSON.parse(data);
        let {id,completed,title} = req.body as CreateReminderDto;
        console.log(id);
        let index = tasks.findIndex(x=>x.id===id);
        if (index>=0) {
            tasks[index]= {title,completed,id}
        }
        return writeFile(path.join(__dirname,"..","data","store.json"),JSON.stringify(tasks),(err)=>{
            if(err) {
                res.writeHead(500,{"Content-Type":"application/json"});
                return res.end(JSON.stringify({
                    success: false,
                    err
                }))
            }
            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: true,
                message: JSON.parse(JSON.stringify({title,completed,id}))
            }))
        })
    })
});
router.delete('/',(req,res)=>{
    return readFile(path.join(__dirname,"..","data","store.json"),"utf-8",(err,data)=>{
        if (err) {
            res.writeHead(500,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: false,
                err
            }))
        }
        let tasks: CreateReminderDto[] = JSON.parse(data);
        const {id} =  (req.body as CreateReminderDto);
        let ind = tasks.findIndex(x=>x.id===id);
        tasks.splice(ind,1)
        return writeFile(path.join(__dirname,"..","data","store.json"),JSON.stringify(tasks),(err)=>{
            if (err) {
                res.writeHead(500,{"Content-Type":"application/json"});
                return res.end(JSON.stringify({
                    success: false,
                    err
                }))
            }
            res.writeHead(200,{"Content-Type":"application/json"});
            return res.end(JSON.stringify({
                success: true,
                message: 'success'
            }))
        })
    })
})
export default router;