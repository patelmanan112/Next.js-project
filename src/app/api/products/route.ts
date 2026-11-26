import { createProductSchema } from "@/schema/product";
import { auth } from "@/auth";
import product from "@/models/product";

export async function POST(request:Request){
    const body = await request.json();
    const result = createProductSchema.safeParse(body);
    const session = await auth()
    if(!result.success){
        return Response.json(
            {
                success : false ,
                data : null
            },
            {
                status :  401
            }
        )
    }

    if (!session?.user) {
        return Response.json(
            {
                success: false,
                data: null,
                message: "Unauthenticated"
            },
            { status: 401 }
        );
    }

    const newProducts = await product.insertMany(result.data);

    return Response.json({
        success: true,
        data: newProducts,
        message: "Products created successfully"
    });
}

export async function GET(request:Request){
 
    const session = await auth()


    if (!session?.user) {
        return Response.json(
            {
                success: false,
                data: null,
                message: "Unauthenticated"
            },
            { status: 401 }
        );
    }
    

       const newProducts = await product.find();

    return Response.json({
        success: true,
        data: newProducts,
        message: "Products Fetched successfully"
    });
}