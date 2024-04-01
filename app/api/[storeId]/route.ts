import {NextResponse} from 'next/server';
import {auth} from "@clerk/nextjs";

import prismadb from '@/lib/prismadb';

export async function POST(req:Request, {params}:{params:{storeId:string}}){
            try{
                const {userId} = await auth();

                const body = await req.json();

                const {imageUrl, label} = body;
                
                const storeId = params.storeId;

                if(!userId){
                    return new NextResponse("unauthenticated",{status:400})
                }

                if(!label){
                    return new NextResponse("label is requiresd", {status:400})
                }
                
                if(!imageUrl){
                    return new NextResponse("image url is required", {status:400})
                }

            const store = await prismadb.store.findFirst(
               { where: {
                    userId,
                    id:storeId
               }}
            )

            if(!store){
                return new NextResponse("unauthorized", {status:401})
            }

                const billbboard =await prismadb.billboard.create({
                   data:{
                   storeId,
                   label,
                   imageUrl
                    
                   }
                } 
                )
                return NextResponse.json(billbboard)
            }
            catch(error){
                    console.log("[storeID]/route",error)
                    return new NextResponse("Internal error", {status:500})
            }
}