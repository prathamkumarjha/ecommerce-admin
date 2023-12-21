import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server"

export async function POST (
    req: Request
){
    console.log('came here')
try{
     const {userId} = auth();
    const body = await req.json();

    const {name} = body
     if(!userId){
        return new NextResponse("user not found", {status: 401})
     }

     if(!name) {
        return new NextResponse("Name is required",{status:400})
     }

    const store = await prismadb.store.create({
        data:{
            name, 
            userId
        }
    });

    return  NextResponse.json(store)
}
catch(error){
    console.log("[api_routes]", error)
    return new NextResponse("internal error", {status: 500});
    }
}

