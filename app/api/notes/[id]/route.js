
import dbConnect from "../../../../lib/db";

import Note from "../../../../models/Note";
import {NextResponse} from "next/server";

export async function DELETE(request,{params}){
    try {
        const {id}= await params;
        await dbConnect();
        const note=await Note.findByIdAndDelete(id);

        if(!note){
            return NextResponse({success:false,error:"Note not found"},{status:404});

        }

        return NextResponse({success:true,data:{}})
    } catch (error) {

        return NextResponse({success:false,error:error.message},{status:400})
    }
}
