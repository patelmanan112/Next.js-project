import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function verifyCredentials(
  credentials: Record<"email" | "password", string | undefined>
) {
  await connectToDatabase();

  if (!credentials.email || !credentials.password) {
    return null;
  }

  const user = await User.findOne({ email: credentials.email });

  if (!user) {
    return null;
  }
  
  if (credentials.password !== user.password) {
    return null;
  }

  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
  };
}