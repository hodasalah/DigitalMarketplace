import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAuth = () => {
    const router = useRouter()

  const signOut = async () => {

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) throw new Error()
      toast.success("You have been logged out successfully.")
      router.push("/sign-in")
      router.refresh()
    } catch (e) {
      toast.error("OOPS Couldn't signout . Please try again")
    }
  }

  return { signOut }
}