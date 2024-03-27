import { NextResponse } from "next/server";
import {auth } from "@clerk/nextjs"; 

import prismadb from "@/lib/prismadb";

export async function POST ( req:Request, ) {
    try{
        const {userId} = await auth();
        const body = await req.json();

        const {name} = body;
        
        if(!userId){
            return new NextResponse("not authenticated", {status:400})
        }

        if(!name){
            return new NextResponse("Name is required" , {status:400})
        }

        console.log(name)

        const store = await prismadb.store.create({
            data:{
                name: name,
                userId
            }
        })

        return NextResponse.json(store)
    }
    catch(error){
            console.log("[stores/route",error)
            return new NextResponse("Internal error", {status:500})
    }

}